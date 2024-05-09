import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import OnboardingData from "./OnboardingData";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const Onboarding = () => {
	const router = useRouter();

	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current; // Define scrollX using useRef
	const slideRef = useRef(null);

	const handleNextSlide = (nextIndex) => {
		if (currentIndex < OnboardingData.length - 1) {
			slideRef.current.scrollToIndex({ index: nextIndex });
		}
	};

	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0]?.index || 0);
	}).current;

	const viewConfigRef = useRef({
		viewAreaCoveragePercentThreshold: 50,
	}).current;

	const scrollTo = async () => {
		if (currentIndex < OnboardingData.length - 1) {
			slideRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			try {
				router.push("/auth/userLogin");
				AsyncStorage.setItem("@viewedOnboarding", "true");
			} catch (error) {
				console.log("Error @scrollTo: ", error);
			}
		}
	};

	return (
		<LinearGradient
		colors={['#a3d1c0','#D9EDDF','#8cd1b7']} // Adjust colors as desired
		style={styles.container}
		>
			<View style={{ flex: 3 }}>
				<FlatList
					data={OnboardingData}
					renderItem={({ item }) => (
						<OnboardingItem
							item={item}
							currentIndex={currentIndex}
							onNext={handleNextSlide}
							scrollX={scrollX}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					keyExtractor={(item) => item.id}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfigRef}
					ref={slideRef}
				/>
			</View>
			<Paginator data={OnboardingData} scrollX={scrollX} />
			<NextButton
				scrollTo={scrollTo}
				percentage={(currentIndex + 1) * (100 / OnboardingData.length)}
			/>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		// backgroundColor: "#D9EDDF",
	},
});

export default Onboarding;
