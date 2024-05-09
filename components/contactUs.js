import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const ContactUs = () => {
  const handleSocialMediaLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.main}>
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.contactText}>If you have further questions or need assistance, please reach out to our support team at www.amc.gov.bt. We're here to help!</Text>

      <View style={styles.socialMediaContainer}>
        <TouchableOpacity style={styles.smContainer} onPress={() => handleSocialMediaLink('https://www.facebook.com')}>
          <Icon name="facebook" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smContainer} onPress={() => handleSocialMediaLink('https://youtube.com')}>
          <Icon name="youtube" size={30} color="#000" />
        </TouchableOpacity>

        <  TouchableOpacity style={styles.smContainer} onPress={() => handleSocialMediaLink('https://www.instagram.com')}>
          <Icon name="instagram" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smContainer} onPress={() => handleSocialMediaLink('https://www.linkedin.com')}>
          <Icon name="linkedin" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.contactInfo}>Email: http://www.amc.gov.bt</Text>
      <Text style={styles.contactInfo}>Phone: +123 456 7890</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  socialMediaContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  smContainer:{
    flexDirection: 'row',
    alignItems:'center',
    padding: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333333',
  },
  socialMediaLink: {
    fontSize: 16,
    marginLeft: 15,
    marginVertical: 10,
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ContactUs;
