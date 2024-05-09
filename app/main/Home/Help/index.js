import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContactUs from '../../../../components/contactUs';
import { LinearGradient } from 'expo-linear-gradient';

const faqData = [
  {
    question: 'What is Animal Intrusion Detection?',
    answer: 'Animal Intrusion Detection is an innovative app designed to monitor and detect unauthorized animal access in your designated areas. It uses advanced sensors and technology to alert you when animals are detected.',
  },
  {
    question: 'How does it work?',
    answer: 'The app utilizes motion sensors and image recognition to identify and notify you about potential animal intrusions. Simply set up the monitoring zones, and the app will keep a watchful eye on your specified areas.',
  },
  {
    question: 'Can I customize monitoring zones?',
    answer: 'Yes, you can easily customize the monitoring zones based on your specific needs.',
  },
  {
    question: 'I am not receiving alerts. What should I do?',
    answer: 'Make sure that your device has proper internet connectivity. Check app settings to ensure notifications are enabled. If the issue persists, contact our support team.',
  },

  {
    question: 'How can I improve detection accuracy?',
    answer: 'Adjust sensitivity settings in the app to fine-tune detection. Ensure that monitoring zones are correctly configured and free from obstructions.',
  },
];

const Help = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded({ ...expanded, [index]: !expanded[index] });
  };

  return (
    <LinearGradient
		colors={['#E7FFF4','#D9EDDF']}
    style={styles.scrollView}
		>
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.title} >Help Center</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions (FAQs)</Text>

          {faqData.map((faq, index) => (
            <View key={index} style={styles.qa}>
              <TouchableOpacity style={styles.questionCont} onPress={() => toggleExpand(index)}>
                <Text style={styles.question}>{faq.question}</Text>
                <AntDesign  name="down" style={styles.icon}/>
              </TouchableOpacity>
              {expanded[index] && <Text style={styles.answer}>{faq.answer}</Text>}
            </View>
          ))}
        </View>
        </View>
        <ContactUs/>
        <Text style={styles.thankYou}>Thank you for choosing Animal Intrusion Detection.</Text>
    </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#D9EDDF',
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    color: '#333333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  qa: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#9a9c9a',
  },
  questionCont:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  icon: {
    color:'#14690f',
  },
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2D6173',
  },
  answer: {
    fontSize: 14,
    color: '#333333',
    paddingBottom: 8,
    paddingLeft: 12,
  },
  step: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333333',
  },
  bullet: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333333',
  },
  contactText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333333',
  },
  thankYou: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Help;
