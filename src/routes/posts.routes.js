import express from "express"; // Import Express.js framework for creating web applications
import multer from "multer"; // Import Multer middleware for handling file uploads

// Import functions for handling post requests from the posts controller
import { listPosts, storePost, uploadImage } from "../controllers/posts.controller.js";

// Configure Multer storage settings
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Set the destination directory for uploaded files (uploads folder)
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Use the original filename for the uploaded file
    cb(null, file.originalname);
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage: storage });

// Function to define routes for the application
const routes = (app) => {
  // Enable parsing of incoming JSON data in requests
  app.use(express.json());

  // Route for getting a list of posts (GET /posts)
  app.get("/posts", listPosts);

  // Route for creating a new post (POST /posts)
  app.post("/posts", storePost);

  // Route for uploading an image and creating a post (POST /upload)
  // Use the 'upload.single("image")' middleware before the uploadImage function
  // This middleware expects a single file named "image" in the request
  app.post("/upload", upload.single("image"), uploadImage);
};

// Export the routes function to be used in the main application file
export default routes;