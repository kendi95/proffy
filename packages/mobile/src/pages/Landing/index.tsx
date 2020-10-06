import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";
import api from "../../services/api";

const Landing: React.FC = () => {
	const navigation = useNavigation();
	const [totalConnections, setTotalConnections] = useState(0);

	const handleNavigation = useCallback((screen) => {
		navigation.navigate(screen);
	}, []);

	useEffect(() => {
		async function getConnections() {
			const response = await api.get("/connections");
			setTotalConnections(response.data.total);
		}
		getConnections();
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/images/landing.png")}
				style={styles.banner}
			/>
			<Text style={styles.title}>
				Seja bem vindo, {"\n"}
				<Text style={styles.titleBold}>O que deseja fazer?</Text>
			</Text>

			<View style={styles.buttonsContainer}>
				<RectButton
					style={[styles.button, styles.buttonPrimary]}
					onPress={() => handleNavigation("Study")}
				>
					<Image source={require("../../assets/images/icons/study.png")} />
					<Text style={styles.buttonText}>Estudar</Text>
				</RectButton>

				<RectButton
					style={[styles.button, styles.buttonSecondary]}
					onPress={() => handleNavigation("GiveClasses")}
				>
					<Image
						source={require("../../assets/images/icons/give-classes.png")}
					/>
					<Text style={styles.buttonText}>Dar aulas</Text>
				</RectButton>
			</View>

			<Text style={styles.totalConnections}>
				Total de {totalConnections} conexões já realizadas{" "}
				<Image source={require("../../assets/images/icons/heart.png")} />
			</Text>
		</View>
	);
};

export default Landing;
