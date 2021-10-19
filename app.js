const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const app = express();
const dbConfig = require("./config/db.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(dbConfig.url);

mongoose.connection.on("error", () => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once("open", () =>
  console.log("Successfully connected to the database")
);

const apiRoute = require("./app/routes/urlshort.routes");
const urlredirectRoute = require("./app/routes/urlredirect.routes");

app.use(logger("dev"));
app.use("/api", apiRoute);
app.use("/", urlredirectRoute);

app.use((req, res) => {
  res.status(404).send({
    error404: "This page is lost in horizon!",
  });
});

const port =3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
