import { Request, Response } from "express";
import db from "../database/connection";

class ConnectionsController {
	async index(request: Request, response: Response) {
		try {
			const countConnections = await db("connections").count("* as total");
			const { total } = countConnections[0];
			return response.status(200).json({ total });
		} catch (error) {
			return response.status(400).json(error);
		}
	}
	async create(request: Request, response: Response) {
		try {
			const { user_id } = request.body;

			await db("connections").insert({
				user_id,
			});

			return response.status(201).send();
		} catch (error) {
			return response.status(400).json(error);
		}
	}
}

export default new ConnectionsController();
