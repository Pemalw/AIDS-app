import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Modal } from 'react-native';

const NoData = () => {
  const a="Boar";
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/error.png')} style={styles.image} />
        {/* <Image source={require(`../assets/images/${a}.jpg`)} style={styles.image} /> */}
        <Text style={styles.warningText}>No detections were found in the past month</Text>
          <Text style={styles.subtext}>
            Is everything working correctly? {"\n"}You can check your sensors, network connection, and device settings.
          </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
  },
  image: {
    width: 100,
    height: 100,
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NoData;
