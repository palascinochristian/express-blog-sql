const express = require("express");
const posts = require("./routers/posts");
const cors = require("cors");
const serverError = require("./middlewares/serverError");
const notFound = require("./middlewares/notFound");
const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors()); //added cors for react-api repository

app.use("/posts", posts);
app.use(serverError); // Middleware per errori del server
app.use(notFound); //Middleware per l'errore 404

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
