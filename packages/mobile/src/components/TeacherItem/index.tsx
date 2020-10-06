import React, { useCallback, useState } from "react";
import { Image, Text, View, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import { Teacher } from "../../pages/TeacherList";

import styles from "./styles";
import api from "../../services/api";

interface TeacherItemProps {
	teacher: Teacher;
	favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
	const [isFavorited, setIsFavorited] = useState(favorited);

	const handleLinkToWhatsApp = useCallback(async () => {
		await api.post("connections", {
			user_id: teacher.id,
		});
		Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
	}, []);

	const handleToggleFavorite = useCallback(async () => {
		const response = await AsyncStorage.getItem("@proffys/favorites");
		let favorites = [];
		if (response) {
			favorites = JSON.parse(response);
		}

		if (isFavorited) {
			favorites = favorites.filter(
				(teacherItem: Teacher) => teacher.id !== teacherItem.id
			);
			setIsFavorited(false);
		} else {
			favorites.push(teacher);
			setIsFavorited(true);
		}

		await AsyncStorage.setItem("@proffys/favorites", JSON.stringify(favorites));
	}, [isFavorited]);

	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<Image
					source={{
						uri: teacher.avatar,
					}}
					style={styles.avatar}
				/>

				<View style={styles.profileInfo}>
					<Text style={styles.name}>{teacher.name}</Text>
					<Text style={styles.subject}>{teacher.subject}</Text>
				</View>
			</View>
			<Text style={styles.bio}>{teacher.bio}</Text>

			<View style={styles.footer}>
				<Text style={styles.price}>
					Preço/hora {"   "}
					<Text style={styles.priceValue}>R$ {teacher.cost}</Text>
				</Text>
				<View style={styles.buttonsContainer}>
					<RectButton
						onPress={handleToggleFavorite}
						style={[
							styles.favoritesButton,
							isFavorited ? styles.favorited : {},
						]}
					>
						{isFavorited ? (
							<Image
								source={require("../../assets/images/icons/unfavorite.png")}
							/>
						) : (
							<Image
								source={require("../../assets/images/icons/heart-outline.png")}
							/>
						)}
					</RectButton>
					<RectButton
						onPress={handleLinkToWhatsApp}
						style={styles.contactButton}
					>
						<Image source={require("../../assets/images/icons/whatsapp.png")} />
						<Text style={styles.contactButtonText}>Entrar em contato</Text>
					</RectButton>
				</View>
			</View>
		</View>
	);
};

export default TeacherItem;
