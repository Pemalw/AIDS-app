import CurrentTab from "../../../../components/CurrentTab";
import NoData from "../../../../components/NoData";
import { useState, useEffect } from "react";
import Paho from "paho-mqtt";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import { get } from "../../../../utils/secureStore";
import { getItems, saveItems } from "../../../../utils/asyncStore";
import { AppState } from 'react-native';
import * as Application from 'expo-application';


client = new Paho.Client(
    "34773dcfbaf24a4bba66e5a333c2df9a.s1.eu.hivemq.cloud",
    Number(8884),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

// client = new Paho.Client(
//   "670e447454294335a3bf85d1ad54205d.s2.eu.hivemq.cloud",
//   Number(8884),
//   `mqtt-async-test-${parseInt(Math.random() * 100)}`
// );

const animalarr=["Bear","Boar","Cattle","Deer","Elephant","Horse","Monkey"]
const sendNotification = async (animalName) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Dakzin",
      body: `Animal Detected: ${animalName} has been detected!`,
      sound: "warning.wav",
      vibrate: true,
      icon: "logo.png"
    },
    trigger: null, // send immediately
  });
};

export default function Home() {
  const [value, setValue] = useState([]);
  const [receivedData, setReceivedData] = useState(false);

  async function store(){
    if(value){
      // await saveItems('animals',Array.toString(value));
      await saveItems('animals', value);
    }
  }

  async function onMessage(message) {
    try{
      const animalarr=["Bear","Boar","Cattle","Deer","Elephant","Horse","Monkey"]
      const animalName = message.payloadString.toString().split("####")[0];
      await sendNotification(animalarr[animalName]);
      // if (message.destinationName === "animal") {
      //   const temp=value;
      //   temp.unshift(message.payloadString.toString().split("####"));
      //   setValue(temp);
      //   setReceivedData(true);
      // }
      if (message.destinationName === "animal") {
        const newItem = message.payloadString.toString().split("####");
        console.log(newItem);
        setValue(prevValue => [newItem, ...prevValue]); // Update the state with new item at the beginning
        setReceivedData(true); // Trigger re-render of CurrentTab
      }
    }catch(err){
      console.log(err);
    }
  }
  const getSystemCredentials = async () => {
    try{
      const cred = await get("sysCred");
      return JSON.parse(cred);
    }catch(err){
      console.log(err)
    }
  };

  const getAnimalItems= async()=>{
    const items=await getItems("animals");
    //console.log(items);
    return items;
  };

  useEffect(() => {

    if(getAnimalItems()){
      getAnimalItems().then((res)=>{
        setValue(res);
      })
    }

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // The app is either going into the background or about to be terminated
        // Execute your function here before the app is closed
        store().then(console.log("successfully saved")).catch(console.log("unsuccessful"));
      }
    };
    AppState.addEventListener('change', handleAppStateChange);

    getSystemCredentials().then((res) => {
      console.log(res);
      try {
        client.connect({
          onSuccess: () => {
            console.log("Connected!");
            client.subscribe("animal");
            client.onMessageArrived = onMessage;
          },
          onFailure: () => {
            console.log("Failed to connect!");
          },
          userName: res.u,
          password: res.p,
          // userName: 'ads001',
          // password: '12345678Ads',
          // userName: 'ads@rpi',
          // password: 'Ads12345678',
          useSSL: true,
        });
      } catch (e) {
        console.log("already connected");
      }
    });
    
  }, []);

  if (!receivedData) {
    return <NoData />;
  } else {
    return (
        <CurrentTab datas={value} />
    )
  }
  
}
