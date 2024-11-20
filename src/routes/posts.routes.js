import express from "express";
import { listPosts } from "../controllers/posts.controller.js";

const routes = (app) => {
	app.use(express.json()); // Enable JSON parsing for incoming requests

	// Define a route to handle GET requests to the '/posts' endpoint
	app.get("/posts", listPosts);
}

export default routes;
