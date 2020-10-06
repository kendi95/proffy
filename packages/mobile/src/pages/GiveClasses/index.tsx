import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";

const GiveClasses: React.FC = () => {
	const { goBack } = useNavigation();

	const handleNavigation = useCallback(() => {
		goBack();
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode='contain'
				style={styles.content}
				source={require("../../assets/images/give-classes-background.png")}
			>
				<Text style={styles.title}>Quer ser proffy?</Text>
				<Text style={styles.description}>
					Para começar, você precisa se cadastrar como professor na mossa
					plataforma web.
				</Text>
			</ImageBackground>

			<RectButton style={styles.button} onPress={handleNavigation}>
				<Text style={styles.buttonText}>Tudo bem</Text>
			</RectButton>
		</View>
	);
};

export default GiveClasses;
