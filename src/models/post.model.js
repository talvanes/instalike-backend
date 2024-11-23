import { ObjectId } from "mongodb";
import connectToDatabase from "../config/db.config.js"; // Import function to connect to MongoDB database

// Connect to the MongoDB database using the connection string from the environment variable
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

// Asynchronous function to create a new post in the MongoDB database
export async function createNewPost(postData) {
  // Get a reference to the 'imersao-instabytes' database
  const db = connection.db("imersao-instabytes");
  // Get a reference to the 'posts' collection within the database
  const collection = db.collection("posts");

  // Insert the provided post data into the collection and return the result
  return collection.insertOne(postData);
}

// Asynchronous function to update the given post in the MongoDB database
export async function updatePostInfo(postID, postData) {
  // Get a reference to the 'imersao-instabytes' database
  const db = connection.db("imersao-instabytes");
  // Get a reference to the 'posts' collection within the database
  const collection = db.collection("posts");

  // Define a MongoDB ObjectID instance from HexString (read the docs)
  const objectId = ObjectId.createFromHexString(postID);
  // Update the provided post with this data into the collection and return the result
  return collection.updateOne({_id: new ObjectId(objectId)}, {$set: postData});
}