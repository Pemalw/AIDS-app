import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  RefreshControl,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const CurrentTab = ({ datas }) => {

  // const [currentTime, setCurrentTime] = useState(getDate());

  // function getDate() {
  //   const now = new Date();
  //   const month = now.getMonth() + 1;
  //   const year = now.getFullYear();
  //   const date = now.getDate();
  //   const hours = now.getHours();
  //   const min = now.getMinutes();
  //   const sec = now.getSeconds();
  //   return `${year}-${month}-${date} ${hours}:${min}:${sec}`;
  // }
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true); // Show the refresh indicator
    // Your logic to fetch new data or perform refresh action
    // ...
    setTimeout(() => {
      setRefreshing(false); // Hide the refresh indicator after some time
    }, 1000); // Simulate a 1-second delay
  }, []);

  // function isNow() {
  //   var nos=""
  //   var nos=datas.length !== 0? datas[3] : "2024-01-29 12:15:00"
  //   const timestamp = new Date(nos).getTime();
  //   const currentTime = new Date().getTime(); // Get current timestamp

  //   const timeDiff = (currentTime - timestamp) / (1000 * 60); // Convert milliseconds to minutes

  //   if (timeDiff <= 5) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      margin: 12,
      // backgroundColor: isNow() ? '#87edbc' : '#ffffff',
      // backgroundColor: "#ffffff",
      // backgroundColor: "#87edbc",
      backgroundColor: "#D9EDDF",
      shadowColor: "#000",
      shadowOffset:{width:5,height:10},
      shadowOpacity:0.26,
      shadowRadius:3,
      paddingHorizontal: 50,
      paddingVertical: 20,
      borderRadius: 25,
    },
    text: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
      margin: 8,
    },
    animalText: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      margin: 8,
    },
    image: {
      width: 250,
      height: 250,
      marginVertical: 10,
      borderRadius: 15,
    },
  });

  const renderItem = ({ item }) => {
    const imageMapping = {
      Bear: require("../assets/images/Bear.jpg"),
      Boar: require("../assets/images/Boar.jpg"),
      Cattle: require("../assets/images/Cattle.jpg"),
      Deer: require("../assets/images/Deer.jpg"),
      Elephant: require("../assets/images/Elephant.jpg"),
      Horse: require("../assets/images/Horse.jpg"),
      Monkey: require("../assets/images/Monkey.jpg")
    };
    const animalarr=["Bear","Boar","Cattle","Deer","Elephant","Horse","Monkey"]

    return (
      <LinearGradient
		colors={['#a3d1c0','#D9EDDF','#8cd1b7']} // Adjust colors as desired
		style={styles.container}
		>
      {/* <View style={styles.container}> */}
        <Text style={styles.text}>{item[1]}</Text>
        <Text style={styles.text}>{item[3]}</Text>
        {/* <Text style={styles.text}>CT: {currentTime}</Text> */}
        <Image style={styles.image} source={imageMapping[animalarr[item[0]]]} />
        <Text style={styles.animalText}>{animalarr[item[0]]}</Text>
      {/* </View> */}
      </LinearGradient>
    );
  };

  return (
    // <ScrollView>
    <View style={styles.main}>
      <FlatList
        renderItem={renderItem}
        data={datas ? datas.slice(0,5) : datas.slice(0,5)}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
    // </ScrollView>
  );
};

export default CurrentTab;
