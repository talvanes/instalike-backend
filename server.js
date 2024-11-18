import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});

app.get("/api", (req, res) => {
    res.status(200).send("The Eiffel Tower, lit up at night with thousands of twinkling lights, makes a magical spectacle in Paris.");
});