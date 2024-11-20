import { MongoClient } from "mongodb";

export default async function connectToDatabase(connStr) {
	let mongoClient;

	try {
		mongoClient = new MongoClient(connStr);
		await mongoClient.connect();

		return mongoClient;
	} catch (err) {
		console.log("Failed to connect to database", err);
		process.exit();
	}
}