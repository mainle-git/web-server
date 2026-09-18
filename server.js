// GET / responds with a greeting of my choice
// GET /hello responds with a sentence describe what I learn in this class

import express from "express";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/api.js";

const app = express();
app.set("view engine", "ejs");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/hello", (req, res) => {
  res.send("I learn about setting up express and nodejs");
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"
  });
});
app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/search", (req, res) => {
  const term = req.query.term || "nothing";
  const limit = parseInt(req.query.limit) || 5;
  res.send(`Searching for "${term}", showing ${limit} results.`);
});

app.use("/", pagesRouter);
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
