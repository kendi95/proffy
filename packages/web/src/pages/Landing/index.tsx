import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

const Landing: React.FC = () => {
	const [totalConnections, setTotalConnections] = useState(0);

	useEffect(() => {
		async function getTotal() {
			const response = await api.get("/connections");
			console.log(response.data);
			setTotalConnections(response.data.total);
		}
		getTotal();
	}, []);

	return (
		<div id='page-landing'>
			<div id='page-landing-content' className='container'>
				<div className='logo-container'>
					<img src={require("../../assets/images/logo.svg")} alt='Proffy' />
					<h2>Sua plataforma de estudos online.</h2>
				</div>

				<img
					src={require("../../assets/images/landing.svg")}
					alt='Plataforma de estudos'
					className='hero-image'
				/>

				<div className='buttons-container'>
					<Link to='/study' className='study'>
						<img
							src={require("../../assets/images/icons/study.svg")}
							alt='Estudar'
						/>
						Estudar
					</Link>
					<Link to='/give-classes' className='give-classes'>
						<img
							src={require("../../assets/images/icons/give-classes.svg")}
							alt='Dar aulas'
						/>
						Dar aulas
					</Link>
				</div>

				<span className='total-connections'>
					Total de {totalConnections} conexões já realizadas
					<img
						src={require("../../assets/images/icons/purple-heart.svg")}
						alt='Total de conexões'
					/>
				</span>
			</div>
		</div>
	);
};

export default Landing;
