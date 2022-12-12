const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5005;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const { validateMovie, validateUser } = require("./validators.js");
const { hashPassword, verifyPassword } = require("./auth");

app.get("/", welcome);


// Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);



// Users
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.post("/api/users", usersHandlers.postUser);
app.put("/api/users/:id", usersHandlers.updateUser);
app.post("/api/users", validateUser, usersHandlers.postUser);
app.delete("/api/users/:id", usersHandlers.deleteUser);
app.post("/api/users", hashPassword, usersHandlers.postUser);

app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
