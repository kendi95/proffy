import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import { Teacher } from "../TeacherList";

import styles from "./styles";

const Favorites: React.FC = () => {
	const [favorites, setFavorites] = useState([] as Teacher[]);

	useFocusEffect(() => {
		async function getFavorites() {
			const response = await AsyncStorage.getItem("@proffys/favorites");
			if (response) {
				setFavorites(JSON.parse(response));
			}
		}
		getFavorites();
	});

	return (
		<View style={styles.container}>
			<PageHeader title='Meus proffys favoritos' />

			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}
				showsVerticalScrollIndicator={false}
				style={styles.teacherList}
			>
				{favorites &&
					favorites.map((favorite) => (
						<TeacherItem
							key={favorite.id}
							teacher={favorite}
							favorited={true}
						/>
					))}
			</ScrollView>
		</View>
	);
};

export default Favorites;
