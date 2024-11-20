import connectToDatabase from "../config/db.config.js"; // Import function to connect to MongoDB database

// Connect to the MongoDB database using the connection string from environment variable
const connection = await connectToDatabase(process.env["MONGODB_CONNECTION_STRING"]);

// Asynchronous function to fetch all posts from the MongoDB database
export async function getAllPosts() {
  // Get a reference to the 'imersao-instabytes' database
  const db = connection.db("imersao-instabytes");
  // Get a reference to the 'posts' collection within the database
  const collection = db.collection("posts");
  // Find all documents in the collection and return them as an array
  return collection.find().toArray();
}