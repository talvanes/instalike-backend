import { getAllPosts } from "../models/post.model.js";

export async function listPosts(req, res) {
	// Fetch all posts using the getAllPosts function
	const posts = await getAllPosts();
	// Send a 200 OK response with the fetched posts as JSON data
	res.status(200).json(posts);
}
