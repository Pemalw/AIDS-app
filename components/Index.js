import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

const Index = () => {
  return (
    <View style={styles.main}>
      <Image style={styles.image} source={require('../assets/images/logo.png')}/>
      <Text style={styles.text}>Dakzin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#666563',
  }
});

export default Index;