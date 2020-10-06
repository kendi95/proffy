import { Request, Response } from "express";
import db from ".././database/connection";
import hourToMinutes from "../utils/hourToMinutes";

interface ISchedule {
	week_day: number;
	from: string;
	to: string;
}

interface IClasses {
	subject: string;
	week_day: string;
	time: string;
}

class ClassesController {
	async index(request: Request, response: Response) {
		try {
			const filters = request.query;
			const { week_day, subject, time } = filters;

			if (!week_day || !subject || !time) {
				return response.status(400).json({
					error: "Missing filters to search classes.",
				});
			}

			const timeInMinutes = hourToMinutes(time as string);

			const classes = await db("classes")
				.whereExists(function () {
					this.select(["class_schedule.*"])
						.from("class_schedule")
						.whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
						.whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
						.whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
						.whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
				})
				.where("classes.subject", "=", subject as string)
				.join("users", "classes.user_id", "=", "users.id")
				.select(["classes.*", "users.*"]);

			return response.status(200).json(classes);
		} catch (error) {
			return response.status(400).json(error);
		}
	}

	async create(request: Request, response: Response) {
		const transaction = await db.transaction();
		try {
			const {
				name,
				avatar,
				whatsapp,
				bio,
				subject,
				cost,
				schedule,
			} = request.body;

			const usersIds = await transaction("users").insert({
				name,
				avatar,
				whatsapp,
				bio,
			});
			const user_id = usersIds[0];

			const classesIds = await transaction("classes").insert({
				subject,
				cost,
				user_id,
			});

			const class_id = classesIds[0];

			const classSchedule = schedule.map((item: ISchedule) => {
				return {
					week_day: item.week_day,
					from: hourToMinutes(item.from),
					to: hourToMinutes(item.to),
					class_id,
				};
			});

			await transaction("class_schedule").insert(classSchedule);

			await transaction.commit();

			return response.status(201).send();
		} catch (error) {
			await transaction.rollback();
			return response.status(400).json(error);
		}
	}
}

export default new ClassesController();
