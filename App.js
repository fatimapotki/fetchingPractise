import React, { useState, useEffect } from "react";
import {
	Text,
	SafeAreaView,
	ScrollView,
	View,
	StyleSheet,
	Image,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import Constants from "expo-constants";

export default function App() {
	const [pet, setPet] = useState();
	const [loading, setLoading] = useState(false);

	const loadPet = async () => {
		const result = await fetch(
			"http://pet-library.moonhighway.com/api/randomPet"
		);
		const data = await result.json();
		// if users use a low network, for making sure the loading picture request
		//is completed then send new render requset
		await Image.prefetch(data.photo.full);
		setPet(data);
		setLoading(false);
	};

	useEffect(() => {
		loadPet();
	}, []);

	//when Applicatin wouldn't find a pet
	if (!pet) return <ActivityIndicator size='large' />;

	return (
		<SafeAreaView style={Styles.container}>
			<ScrollView
				// it is a main property that scrollview has to cause the screen to be refreshed by dragging
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={loadPet} />
				}>
				<Image style={Styles.image} source={{ uri: pet.photo.full }} />
				<Text style={Styles.paragraph}>
					{pet.name} - {pet.category}
				</Text>
			</ScrollView>
		</SafeAreaView>
	);
}
const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#ecf0f1",
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	image: {
		height: 500,
		width: 500,
	},
});
