import React, { FormEvent, useCallback, useState } from "react";
import Input from "../../components/Input";

import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import api from "../../services/api";

import "./styles.css";

const TeacherList: React.FC = () => {
	const [subject, setSubject] = useState("");
	const [weekDay, setWeekDay] = useState("");
	const [time, setTime] = useState("");
	const [classes, setClasses] = useState([{} as Teacher]);

	const searchTeachers = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			const response = await api.get("/classes", {
				params: {
					week_day: weekDay,
					subject,
					time,
				},
			});
			setClasses(response.data);
		},
		[weekDay, subject, time]
	);

	return (
		<div id='page-teacher-list' className='container'>
			<PageHeader title='Estes são os proffys disponíveis.'>
				<form id='search-teachers' onSubmit={searchTeachers}>
					<Select
						label='Matéria'
						name='subject'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						options={[
							{ value: "Artes", label: "Artes" },
							{ value: "Biologia", label: "Biologia" },
							{ value: "Ciências", label: "Ciências" },
							{ value: "Educação Física", label: "Educação Física" },
							{ value: "Geografia", label: "Geografia" },
							{ value: "Matemática", label: "Matemática" },
							{ value: "História", label: "História" },
							{ value: "Postuguês", label: "Postuguês" },
							{ value: "Química", label: "Química" },
						]}
					/>
					<Select
						label='Dia da semana'
						name='week_day'
						value={weekDay}
						onChange={(e) => setWeekDay(e.target.value)}
						options={[
							{ value: "0", label: "Domingo" },
							{ value: "1", label: "Segunda-feira" },
							{ value: "2", label: "Terça-feira" },
							{ value: "3", label: "Quarta-feira" },
							{ value: "4", label: "Quinta-feira" },
							{ value: "5", label: "Sexta-feira" },
							{ value: "6", label: "Sábado" },
						]}
					/>
					<Input
						type='time'
						label='Hora'
						name='time'
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>

					<button type='submit'>Pesquisar</button>
				</form>
			</PageHeader>

			{classes &&
				classes.map((classItem) => (
					<main>
						<TeacherItem teacher={classItem} key={classItem.id} />
					</main>
				))}
		</div>
	);
};

export default TeacherList;
