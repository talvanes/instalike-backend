import express from "express";

const posts = [
  {
    id: 1,
    description: "Millie the tabby kitty",
    image: "https://placecats.com/millie/300/150"
  },
  {
    id: 2,
    description: "Sunset over the ocean",
    image: "https://placecats.com/beach/500/250"
  },
  {
    id: 3,
    description: "Cute kitten",
    image: "https://placecats.com/kitten/200/100"
  },
  {
    id: 4,
    description: "Mountain landscape",
    image: "https://placecats.com/mountains/600/300"
  }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});

function fetchPostByID(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.get("/posts/:id", (req, res) => {
  const index = fetchPostByID(req.params.id);
  res.status(200).json(posts[index]);
});