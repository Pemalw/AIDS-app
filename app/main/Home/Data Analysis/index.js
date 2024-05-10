import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
// import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const DataAnalysis = () => {
  const [datas, setDatas] = useState(null);
  const [tot, setTot]=useState(0);
  const [bear, setBear]=useState([]);
  const [boar, setBoar]=useState([]);
  const [cattle, setCattle]=useState([]);
  const [deer, setDeer]=useState([]);
  const [elephant, setElephant]=useState([]);
  const [horse, setHorse]=useState([]);
  const [monkey, setMonkey]=useState([]);
  const [sum, setSum]=useState([]);
  const [dates, setDates]=useState([]);
  const [rec, setRec]=useState(false);

  const getLength=(arr)=>{return arr.length;}


  const backendUrl = 'http://127.0.0.1:5050'; // Replace with your actual values

  
  useEffect(() => {

    
    const fetchData=async()=>{
      try {//
        fetch('http://192.168.219.188:5050/analysis/getanimals').then(response=>response.json()).then( data=>{
          setBear(data.Bear);
          setBoar(data.Boar);
          setCattle(data.Cattle);
          setDeer(data.Deer);
          setElephant(data.Elephant);
          setHorse(data.Horse);
          setMonkey(data.Monkey);
          setSum(data.Sums);
          setDates(data.Dates);
          // setTot(temp);
          
          let temp=0;

          for(let i=0; i<data.Sums.length; i++){
            temp=temp+data.Sums[i];
          }

          setTot(temp);
          setRec(true);
        console.log(data);
      }).catch(err=>{
          setRec(false);
          
          console.log("My :error");
      });
      //   try{
  
      //   for(let i=0; i<response.data.Sums.length; i++){
      //     temp=temp+response.data.Sums[i];
      //   }
      //   setTot(temp);
      // }catch(err){
      //     setTot(0);
      //   }
      //setRec(false);
      } catch (error) {
        setRec(false);
        console.log(err);
      } 
     
    }
    
    fetchData();
    
  }, [bear]);

  const data = {
    labels: dates,
    datasets: [
      {
        data: bear,
        color: (opacity = 1) => `rgba(219, 35, 29, ${opacity})`
      },
      {
        data: boar,
        color: (opacity = 1) => `rgba(247, 149, 2, ${opacity})`
      },
      {
        data: cattle,
        color: (opacity = 1) => `rgba(247, 243, 2, ${opacity})`

      },
      {
        data: deer,
        color: (opacity = 1) => `rgba(19, 247, 2, ${opacity})`
      },
      {
        data: elephant,
        color: (opacity = 1) => `rgba(2, 247, 215, ${opacity})`
      },
      {
        data: horse,
        color: (opacity = 1) => `rgba(2, 2, 247, ${opacity})`
      },
      {
        data: monkey,
        color: (opacity = 1) => `rgba(247, 2, 76, ${opacity})`
      }
    ],
  };

  const demo = {
    labels: ['5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <LinearGradient
		colors={['#a3d1c0','#D9EDDF','#8cd1b7']} // Adjust colors as desired
		>
    <ScrollView style={styles.main}>
      <View style={styles.totalDataContainer}>
        <View style={styles.sepDataContainer}>
          <Text numberOfLines={2} style={styles.totalDataText}>Total no. of Animals</Text>
          <Text numberOfLines={2} style={styles.totalDataText}>Detected: </Text>
          <Text style={styles.numberData}>{rec?tot:0}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.sepDataContainer}>
          <Text style={styles.totalDataText}>Types of Animals</Text>
          <Text numberOfLines={2} style={styles.totalDataText}>Detected:  </Text>
          <Text style={styles.numberData}>{rec?getLength(sum):0}</Text>
        </View>
      </View>
      <View style={styles.container}>
      <LineChart
          data={rec?data:demo}
          width={350}
          height={440}
          verticalLabelRotation={90}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        /> 
      </View>
      <Text style={styles.text}>Graph depicting number of times animals were detected and when</Text>
      <View style={styles.table}>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Bear.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Bear</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[0]:''} </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Boar.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Boar</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[1]:''}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Cattle.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Cattle</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[2]:''}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Deer.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Deer</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[3]:''}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Elephant.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Elephant</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[4]:''}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Horse.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Horse</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[5]:''}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Monkey.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Monkey</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {rec?sum[6]:''}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#D9EDDF',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  totalDataContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#267B89',
    margin: 20,
    paddingVertical: 15,
    paddingLeft: 25,
    borderRadius: 15,
  },
  sepDataContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  totalDataText: {
    fontWeight: 'bold',
    color: '#f0fcf9',
    fontSize: 12,
  },
  numberData:{
    fontWeight: 'bold',
    fontSize: 26,
    color: '#f0fcf9',
    textAlign: 'center',
    paddingTop: 5,
  },
  line: {
    backgroundColor: '#c2c1c0',
    width: 1,
    height: 80,
    marginRight: 22,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    fontStyle:'italic',
    textAlign: 'center',
    marginHorizontal: 5,
    marginBottom: 18,
  },
  table:{
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 20,
    borderRadius: 15,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c2c1c0',
  },
  imgItems:{
    width: 70,
    height: 70,
    borderRadius: 10,
    marginVertical: 8,
  },
  itemsText: {
    fontSize: 16,
    paddingLeft: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSubText: {
    fontSize: 12,
    paddingLeft: 15,
    marginBottom: 8,
  }
});

export default DataAnalysis;
