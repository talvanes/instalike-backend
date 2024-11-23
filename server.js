import express from "express"; // Import Express.js framework for creating web applications
import routes from "./src/routes/posts.routes.js";  // Import post handling routes to use in the main application file

const app = express(); // Create an Express application instance
app.use(express.static("uploads"));  // This strategy serves static images under "uploads" folder
routes(app);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
