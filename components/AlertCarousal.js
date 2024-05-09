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
    data: "Receive real-time alerts on your device when animal intrusions are detected."
  },
  {
    id: 2,
    img: require("../assets/images/amclogo.png"),
    data: "Customize notification preferences in the app settings."
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
                {item.data && (
                  <Text style={styles.data}>{item.data}</Text>
                )}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    width: 400,
    height: 200,
    backgroundColor: "#fff",
    // marginHorizontal:10,
  },
  cardContainer: {
    width: 360,
    flex: 0.1,
    justifyContent: "center",
    alignItems: 'center',
    rowGap: 20,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  data: {
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AboutUsCardCarousel;
