import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import styles from "./styles";
import api from "../../services/api";

export interface Teacher {
	id: number;
	avatar: string;
	bio: string;
	cost: number;
	name: string;
	subject: string;
	whatsapp: string;
}

const TeacherList: React.FC = () => {
	const [filtersVisible, setFiltersVisible] = useState(false);
	const [teachers, setTeachers] = useState([{} as Teacher]);
	const [favorites, setFavorites] = useState<number[]>([]);
	const [subject, setSubject] = useState("");
	const [weekDay, setWeekDay] = useState("");
	const [time, setTime] = useState("");

	const handleFilterSubmit = useCallback(async () => {
		const response = await api.get("/classes", {
			params: {
				subject,
				week_day: weekDay,
				time,
			},
		});
		setTeachers(response.data);
		setFiltersVisible(false);
	}, [subject, weekDay, time]);

	const loadFavorites = useCallback(async () => {
		let response = await AsyncStorage.getItem("@proffys/favorites");
		if (response) {
			response = JSON.parse(response);
			const favoriteIds = response.map((favorite: Teacher) => favorite.id);
			setFavorites(favoriteIds);
		}
	}, []);

	useFocusEffect(() => {
		loadFavorites();
	});

	return (
		<View style={styles.container}>
			<PageHeader
				title='Proffys disponíveis'
				headerRight={
					<BorderlessButton
						style={styles.filterButton}
						onPress={() => setFiltersVisible(!filtersVisible)}
					>
						<Feather name='filter' size={20} color='#fff' />
					</BorderlessButton>
				}
			>
				{filtersVisible && (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							placeholderTextColor='#c1bccc'
							style={styles.input}
							value={subject}
							onChangeText={setSubject}
							placeholder='Qual a matéria?'
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Dia da semana</Text>
								<TextInput
									placeholderTextColor='#c1bccc'
									style={styles.input}
									value={weekDay}
									onChangeText={setWeekDay}
									placeholder='Qual o dia?'
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Horário</Text>
								<TextInput
									placeholderTextColor='#c1bccc'
									style={styles.input}
									value={time}
									onChangeText={setTime}
									placeholder='Qual horário?'
								/>
							</View>
						</View>

						<RectButton
							style={styles.submitButton}
							onPress={handleFilterSubmit}
						>
							<Text style={styles.submitButtonText}>Filtrar</Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			{teachers.length > 0 && (
				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 16,
						paddingBottom: 16,
					}}
					showsVerticalScrollIndicator={false}
					style={styles.teacherList}
				>
					{teachers.map((teacher) => (
						<TeacherItem
							key={teacher.id}
							teacher={teacher}
							favorited={favorites.includes(teacher.id)}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default TeacherList;
