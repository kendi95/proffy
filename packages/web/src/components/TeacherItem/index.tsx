import React, { useCallback } from "react";
import api from "../../services/api";

import "./styles.css";

export interface Teacher {
	id: number;
	subject: string;
	cost: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

interface TeacherClass {
	teacher: Teacher;
}

const TeacherItem: React.FC<TeacherClass> = ({ teacher }) => {
	const handleCreateConnection = useCallback(async () => {
		await api.post("/connections", {
			user_id: teacher.id,
		});
	}, [teacher]);

	return (
		<article className='teacher-item'>
			<header>
				<img src={teacher.avatar} alt={teacher.name} />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>

			<p>{teacher.bio}</p>
			<footer>
				<p>
					Preço/hora
					<strong>R$ {teacher.cost}</strong>
				</p>
				<a
					target='_blank'
					rel='noopener noreferrer'
					href={`https://wa.me/${teacher.whatsapp}?text=Fala cara beleza!`}
					onClick={handleCreateConnection}
				>
					<img
						src={require("../../assets/images/icons/whatsapp.svg")}
						alt='Whatsapp'
					/>
					Entrar em contato
				</a>
			</footer>
		</article>
	);
};

export default TeacherItem;
