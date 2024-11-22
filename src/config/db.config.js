import { MongoClient } from "mongodb"; // Import the MongoDB client library

export default async function connectToDatabase(connStr) {
  let mongoClient;

  try {
    // Create a new MongoClient instance with the provided connection string
    mongoClient = new MongoClient(connStr);
    // Connect to the MongoDB database
    await mongoClient.connect();

    // Return the connected MongoClient instance
    return mongoClient;
  } catch (err) {
    // Log the error message to the console
    console.log("Failed to connect to database", err);
    // Exit the process with a non-zero exit code to indicate failure
    process.exit();
  }
}