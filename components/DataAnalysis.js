import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const DataAnalysis = () => {
  const data = {
    labels: ['5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <ScrollView style={styles.main}>
      <Text style={styles.text}>Data Analysis</Text>
      <View style={styles.container}>
        <LineChart
          data={data}
          width={300}
          height={200}
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
      <View>
        <Image source={require('../assets/images/Bear.jpg')}/>
        <Text>Bear</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding:10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
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
  }
});

export default DataAnalysis;
