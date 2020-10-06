import { resolve } from "path";

module.exports = {
	client: "sqlite3",
	connection: {
		filename: resolve(__dirname, "src", "database", "database.sqlite"),
	},
	useNullAsDefault: true,
	migrations: {
		directory: resolve(__dirname, "src", "database", "migrations"),
	},
};
