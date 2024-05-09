import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	useWindowDimensions,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OnboardingItem = ({ item }) => {
	const { width } = useWindowDimensions();
	const imageSize = width * 0.35;
	return (
		<View style={[styles.container, { width }]}>
			{item.image && (
			<Image
				source={item.image}
				style={[
					styles.image,
					{
						width: imageSize,
						height: imageSize,
						resizeMode: "contain",
						marginTop: imageSize,
					},
				]}
			/>)}
			{item.icon &&(
				<MaterialIcons name={item.icon} size={imageSize} color={"#4fbd92"} style={[styles.image,{marginTop:imageSize,}]}/>
			)}
		<View style={{ flex: 1 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		flex: 0.7,
		justifyContent: "center",
	},
	title: {
		fontSize: 22,
		fontWeight: "800",
		marginBottom: 10,
		color: "#279698",
		textAlign: "center",
	},
	description: {
		fontSize: 17,
		fontWeight: "300",
		color: "#192655",
		textAlign: "center",
		paddingHorizontal: 50,
	},
});

export default OnboardingItem;
