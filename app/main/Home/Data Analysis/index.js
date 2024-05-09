import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const DataAnalysis = () => {
  const [datas, setDatas] = useState([]);
  const [tot, setTot]=useState(0);

  const backendUrl = 'http://127.0.0.1:5050'; // Replace with your actual values

  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5050/analysis/getanimals'); // Replace with your endpoint URL
      
      
      setDatas(response.data);
      let temp=0;

      for(let i=0; i<response.data.Sums.length; i++){
        temp=temp+response.data.Sums[i];
      }
      setTot(temp);
      
    } catch (error) {
      
    } 
  };
  useEffect(() => {
    getData();
  }, [datas]);

  const data = {
    labels: datas.length===0?['5', '10', '15', '20', '25', '30']: datas.Dates,
    datasets: [
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Bear,
        color: (opacity = 1) => `rgba(219, 35, 29, ${opacity})`
      },
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Boar,
        color: (opacity = 1) => `rgba(247, 149, 2, ${opacity})`
      },
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Cattle,
        color: (opacity = 1) => `rgba(247, 243, 2, ${opacity})`

      },
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Deer,
        color: (opacity = 1) => `rgba(19, 247, 2, ${opacity})`
      },
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Elephant,
        color: (opacity = 1) => `rgba(2, 247, 215, ${opacity})`
      },
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Horse,
        color: (opacity = 1) => `rgba(2, 2, 247, ${opacity})`
      },
      {
        data: datas.length===0?[20, 45, 28, 80, 99, 43]:datas.Monkey,
        color: (opacity = 1) => `rgba(247, 2, 76, ${opacity})`
      }
    ],
  };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.totalDataContainer}>
        <View style={styles.sepDataContainer}>
          <Text numberOfLines={2} style={styles.totalDataText}>Total no. of Animals</Text>
          <Text numberOfLines={2} style={styles.totalDataText}>Detected: </Text>
          <Text style={styles.numberData}>{datas.length==0?0:tot}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.sepDataContainer}>
          <Text style={styles.totalDataText}>Types of Animals</Text>
          <Text numberOfLines={2} style={styles.totalDataText}>Detected:  </Text>
          <Text style={styles.numberData}>{datas.length==0?0:datas.Sums.length}</Text>
        </View>
      </View>
      <Text style={styles.text}>Data Analysis</Text>
      <View style={styles.container}>
        <LineChart
          data={data}
          width={400}
          height={300}
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
      <View style={styles.table}>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Bear.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Bear</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[0]} </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Boar.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Boar</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[1]}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Cattle.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Cattle</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[2]}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Deer.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Deer</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[3]}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Elephant.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Elephant</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[4]}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Horse.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Horse</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[5]}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={require('../../../../assets/images/Monkey.jpg')} style={styles.imgItems}/>
          <View>
            <Text style={styles.itemsText}>Monkey</Text>
            <Text style={styles.itemSubText}>Number of Times Detected: {datas.length==0?'':datas.Sums[6]}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginHorizontal: 10,
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
    fontSize: 14,
  },
  numberData:{
    fontWeight: 'bold',
    fontSize: 30,
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
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
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 8,
  },
  itemsText: {
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemSubText: {
    fontSize: 14,
    paddingLeft: 15,
    marginBottom: 8,
  }
});

export default DataAnalysis;
