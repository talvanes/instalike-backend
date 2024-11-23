import fs from "fs"; // Import the Node.js file system module
import { createNewPost, getAllPosts, updatePostInfo } from "../models/post.model.js"; // Import functions for creating and retrieving posts from the post model
import generateGeminiLikeDescription from "../services/gemini.service.js";  // Import Gemini-like function to help craft description and alt-text for any image

// Asynchronous function to list all posts
export async function listPosts(req, res) {
  const posts = await getAllPosts(); // Fetch all posts from the database
  res.status(200).json(posts); // Send the fetched posts as a JSON response with a 200 OK status code
}

// Asynchronous function to store a new post
export async function storePost(req, res) {
  const postData = req.body; // Extract the post data from the request body

  try {
    const newPost = await createNewPost(postData); // Create a new post in the database
    res.status(201).json(newPost); // Send the newly created post as a JSON response with a 201 Created status code
  } catch (err) {
    console.error(err.message); // Log the error message to the console
    res.status(500).json({ error: "Request failed" }); // Send a 500 Internal Server Error response with an error message
  }
}

// Asynchronous function to upload an image and create a new post
export async function uploadImage(req, res) {
  const postData = {
    description: "",
    imgUrl: req.file.originalname, // Extract the original filename of the uploaded image
    altText: "",
  };

  try {
    const newPost = await createNewPost(postData); // Create a new post in the database
    const updatedImgPath = `uploads/${newPost.insertedId}.png`; // Construct the desired path for the image
    fs.renameSync(req.file.path, updatedImgPath); // Rename the uploaded image to the desired path
    res.status(201).json(newPost); // Send the newly created post as a JSON response with a 201 Created status code
  } catch (err) {
    console.error(err.message); // Log the error message to the console
    res.status(500).json({ error: "Request failed" }); // Send a 500 Internal Server Error response with an error message
  }
}

// Asynchronous function to update the given post info
export async function updatePost(req, res) {
  const postID = req.params.id; // Extract the given post ':id'
  const imgUrl = `${process.env["PROJECT_BASE_URL"]}/${postID}.png`;  // Use the same image url

  try {
    const imageBuffer = fs.readFileSync(`uploads/${postID}.png`); // Create buffer from the image on the given path
    const description = await generateGeminiLikeDescription(imageBuffer); // Generate description for the image using Google Gemini
    const postData = {  // Some info to update the given post
      imgUrl: imgUrl,
      description: description,
      altText: req.body.altText,
    };

    const post = await updatePostInfo(postID, postData); // Create a new post in the database

    res.status(200).json(post); // Send the updated post as a JSON response with a 200 OK status code
  } catch (err) {
    console.error(err.message); // Log the error message to the console
    res.status(500).json({ error: "Request failed" }); // Send a 500 Internal Server Error response with an error message
  }
}
