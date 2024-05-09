import React, { useState } from "react";
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated}from 'react-native';
import AboutUsCardCarousel from "../../../../components/AboutUsCardCarousel";

const AboutUs  = () => {
    return (
        <ScrollView style={{backgroundColor:'#D9EDDF'}}>
            <View style={styles.carContainer}>
                <AboutUsCardCarousel style={styles.carousal}className="h-[100%] p-3 mt-3 "/>
            </View>
        </ScrollView>
    );
};

export default AboutUs;

const styles = StyleSheet.create({
    carContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});