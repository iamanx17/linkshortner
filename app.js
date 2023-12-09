const path = require("path");

const express = require("express");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
const nunjucks = require("nunjucks");

const util = require("./utils/db");

const PORT = process.env.PORT || 3000;
const mongooseURL = "mongodb://localhost:27017/linkShortner";

const app = express();

app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const store = new mongodbSession({
  uri: mongooseURL,
  collection: "session",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "gxdp8-kygcw-m4fgh-pqp3d-brdjg",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(require(path.join(__dirname, "./routes/shorturl")));
app.use(require(path.join(__dirname, "./routes/api")));

app.use((req, res, next) => {
  res.send("<h1>This page is lost in event horizon</h1>");
});

app.listen(PORT, async () => {
  util.connectDB(mongooseURL);
  console.log("server started successfully at port:", PORT);
});
