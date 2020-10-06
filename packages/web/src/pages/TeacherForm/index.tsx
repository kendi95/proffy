import React, { FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import api from "../../services/api";

import "./styles.css";

const TeacherList: React.FC = () => {
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [bio, setBio] = useState("");
	const [subject, setSubject] = useState("");
	const [cost, setCost] = useState(0);
	const [scheduleItems, setScheduleItems] = useState([
		{ week_day: 0, from: "", to: "" },
	]);

	const history = useHistory();

	const addNewScheduleItem = useCallback(() => {
		setScheduleItems((oldValues) => [
			...oldValues,
			{
				week_day: 0,
				from: "",
				to: "",
			},
		]);
	}, []);

	const handleCreateClass = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			try {
				await api.post("/classes", {
					name,
					avatar,
					whatsapp,
					bio,
					subject,
					cost,
					schedule: scheduleItems,
				});

				alert("Cadastro realizado com sucesso!");
				history.push("/");
			} catch (error) {
				alert("Erro no cadastro.");
			}
		},
		[avatar, bio, cost, history, name, scheduleItems, subject, whatsapp]
	);

	const setScheduleItemValue = useCallback(
		(positionIndex: number, field: string, value: string) => {
			setScheduleItems((oldValues) => {
				const schedule = oldValues.map((item, index) => {
					if (index === positionIndex) {
						return { ...item, [field]: value };
					}
					return item;
				});
				return schedule;
			});
		},
		[]
	);

	return (
		<div id='page-teacher-form' className='container'>
			<PageHeader
				title='Que incrível que você quer dar aulas.'
				description='O primeiro passo é preencher esse formulário de inscrição'
			/>
			<main>
				<form onSubmit={handleCreateClass}>
					<fieldset>
						<legend>Seus dados</legend>
						<Input
							label='Nome completo'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							label='Avatar'
							name='avatar'
							value={avatar}
							onChange={(e) => setAvatar(e.target.value)}
						/>
						<Input
							label='WhatsApp'
							name='whatsapp'
							value={whatsapp}
							onChange={(e) => setWhatsapp(e.target.value)}
						/>
						<TextArea
							label='Biografia'
							name='bio'
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
					</fieldset>

					<fieldset>
						<legend>Sobre a aula</legend>
						<Select
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							label='Matéria'
							name='subject'
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
						<Input
							label='Custo da sua hora por aula'
							name='cost'
							value={cost}
							onChange={(e) => setCost(Number(e.target.value))}
						/>
					</fieldset>

					<fieldset>
						<legend>
							Horários disponíveis
							<button onClick={addNewScheduleItem} type='button'>
								+ Novo horário
							</button>
						</legend>

						{scheduleItems.map((scheduleItem, index) => (
							<div key={scheduleItem.week_day} className='schedule-item'>
								<Select
									value={scheduleItem.week_day}
									onChange={(e) =>
										setScheduleItemValue(index, "week_day", e.target.value)
									}
									label='Dia da semana'
									name='week_day'
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
									label='Das'
									name='from'
									type='time'
									value={scheduleItem.from}
									onChange={(e) =>
										setScheduleItemValue(index, "from", e.target.value)
									}
								/>
								<Input
									label='Até'
									name='to'
									type='time'
									value={scheduleItem.to}
									onChange={(e) =>
										setScheduleItemValue(index, "to", e.target.value)
									}
								/>
							</div>
						))}
					</fieldset>

					<footer>
						<p>
							<img
								src={require("../../assets/images/icons/warning.svg")}
								alt='Aviso importante'
							/>
							Importante ! <br />
							Preencha todos os dados
						</p>
						<button type='submit'>Salvar cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	);
};

export default TeacherList;
