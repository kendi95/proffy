import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";

import Landing from "../pages/Landing";
import GiveClasses from "../pages/GiveClasses";

import StudyRoutes from "./study.routes";

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerShown: false,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			>
				<Screen name='Landing' component={Landing} />
				<Screen name='Study' component={StudyRoutes} />
				<Screen name='GiveClasses' component={GiveClasses} />
			</Navigator>
		</NavigationContainer>
	);
};

export default Routes;
