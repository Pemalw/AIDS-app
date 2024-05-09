import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
} from "react-native";
import { useState, useRef } from "react";
import { BackgroundImage } from "@rneui/base";

const about_data = [
  {
    id: 1,
    img: require("../assets/images/amclogo.png"),
    bgimg: require("../assets/images/amcbg.jpeg"),
    title: "Agriculture Machinery and Technology Center",
    data:
      "The Agriculture Machinery and Technology, founded in 1983, has been a key player in realizing national food self-sufficiency. With a vision that places Bhutanese farmers at the core of all agricultural development activities, AMTC has strategically worked towards enhancing the effectiveness and efficiency of farming practices through the mechanization of agriculture.",
  },
  {
    id: 2,
    img: require("../assets/images/cstlogo.png"),
    bgimg: require("../assets/images/cstbg.png"),
    title: "College of Science and Technology",
    data:
      "The College of Science and Technology, established as the first institute in the country to offer undergraduate degree programs in engineering under the Royal University of Bhutan, has consistently strived to be a center of excellence in science and technology. Enriched with Gross National Happiness (GNH) values, CST is committed to providing quality programs that align with the evolving needs of the job market.",
  },
  {
    id: 3,
    // bgimg: require("../assets/images/profilebg5.png"),
    title:
      "Fostering Innovation: CST and AMTC Collaborate on Cutting-Edge Projects",
    data:
      "The College of Science and Technology (CST) and the Agriculture Machinery and Training Center (AMTC) have forged a dynamic collaboration aimed at pushing the boundaries of technological innovation in Bhutan. These two esteemed institutions, each with its unique vision and mission, have come together to work on groundbreaking projects that address critical challenges in agriculture and technology. \n\n The collaboration between CST and AMTC has resulted in the initiation of innovative projects that hold great promise for the agricultural sector. One such project is the development of an Animal Intrusion Detection System, a cutting-edge technology designed to address the challenges posed by wildlife intrusion into farmlands. This collaborative effort leverages CST's expertise in engineering and technology to create a solution that not only safeguards crops but also ensures harmonious coexistence between agriculture and the environment.",
  },
  {
    id: 4,
    // bgimg: require("../assets/images/profilebg3.png"),
    profiles: [
      {
        id: 1,
        img: require("../assets/images/profile/1.jpeg"),
        profileName: "Tsheten Dorji",
        profileData: "Project Guide",
      },
      {
        id: 2,
        img: require("../assets/images/profile/2.png"),
        profileName: "Kuenzang Thinley",
        profileData: "Project Co-guide",
      },
      {
        id: 4,
        img: require("../assets/images/profile/4.png"),
        profileName: "Tandin Phuntsho",
        profileData: "Project Member",
      },
      {
        id: 5,
        img: require("../assets/images/profile/5.png"),
        profileName: "Yeshi Tshomo",
        profileData: "Project Member",
      },
      {
        id: 6,
        img: require("../assets/images/profile/6.png"),
        profileName: "Karsel Dawa",
        profileData: "Project Member",
      },
      {
        id: 7,
        img: require("../assets/images/profile/7.png"),
        profileName: "Pema Lhaden Wangchuk",
        profileData: "Project Member (Team Leader)",
      },
      
    ],
  },
];

export function AboutUsCardCarousel() {
  const [current, setCurrent] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrent(viewableItems[0].index);
  }).current;
  const container_width = 350;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={about_data}
          renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <BackgroundImage
              source={item.bgimg}
              // blurRadius={1}
              style={styles.backgroundImage}
            >
              <View style={styles.bgImgContainer}>
                {item.title && (
                  <Text style={styles.title}>{item.title}</Text>
                )}
                {item.img && (
                  <View style={styles.logoContainer}>
                    <Image source={item.img} style={styles.logo} />
                  </View>
                )}
                {item.data && (
                  <Text style={styles.data}>{item.data}</Text>
                )}
                {item.profiles && (
                  <View style={styles.profilesContainer}>
                    <Text style={styles.titleText}>Project Team</Text>
                    {item.profiles.map(profile => (
                      <View key={profile.id} style={styles.profileContainer}>
                        <Image source={profile.img} style={styles.profileImage} />
                        <View style={styles.profileDataContainer}>
                          <Text style={styles.profileName}>{profile.profileName}</Text>
                          <Text style={styles.profileData}>{profile.profileData}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
                </View>
              </BackgroundImage>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />

        </ScrollView>
        {/** pagination */}
        <View
          className="border-2 border-black rounded-xl "
          style={{
            marginTop:15,
            flexDirection: "row",
            backgroundColor: "#fff",
            width: container_width,
            justifyContent: "center",
          }}
        >
          {about_data.map((_, i) => {
            const inputRange = [
              (i - 1) * container_width,
              (i - 1) * container_width,
              (i - 1) * container_width,
              i * container_width,
              (i + 1) * container_width,
              (i + 1) * container_width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 0.5, 0.5, 1, 0.5, 0.5],
            });
            const widthX = scrollX.interpolate({
              inputRange,
              outputRange: [4, 4, 4, 20, 4, 4],
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 5,
                  width: widthX,
                  backgroundColor: "#279698",
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .6,
    justifyContent: "start",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    width: 380,
    height: 550,
    // height: 650,
    backgroundColor: "#fff",
    borderRadius: 15,
    // marginHorizontal:10,
  },
  cardContainer: {
    width: 360,
    flex: 0.1,
    justifyContent: "start",
    rowGap: 20,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  bgImgContainer:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    margin: 12,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  data: {
    color: "#fff",
    textAlign: "justify",
    fontSize: 16,
  },
  profilesContainer: {
    flexDirection: 'column',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    marginBottom: 8,
  },
  profileDataContainer: {
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  profileName: {
    fontWeight: "bold",
    color: '#fff',
    marginTop: 5,
  },
  profileData: {
    color: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default AboutUsCardCarousel;
