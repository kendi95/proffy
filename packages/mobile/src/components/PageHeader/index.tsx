import React, { ReactNode, useCallback } from "react";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation, StackActions } from "@react-navigation/native";

import styles from "./styles";

interface PageHeaderProps {
	title: string;
	headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	headerRight,
	children,
}) => {
	const { dispatch } = useNavigation();

	const handleGoBack = useCallback(() => {
		dispatch(StackActions.pop(1));
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style='light' />
			<View style={styles.topBar}>
				<BorderlessButton onPress={handleGoBack}>
					<Image
						resizeMode='contain'
						source={require("../../assets/images/icons/back.png")}
					/>
				</BorderlessButton>
				<Image
					resizeMode='contain'
					source={require("../../assets/images/logo.png")}
				/>
			</View>

			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>

				{headerRight}
			</View>

			{children}
		</View>
	);
};

export default PageHeader;
