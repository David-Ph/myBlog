require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

// ? app.use
// //////////
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");

// ? import routes
// //////////
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

// ?import error handler
// /////////////////////
const errorHandler = require("./middlewares/errorHandler/errorHandler");

// ? set routes
// ///////////////
app.get("/", function (req, res) {
  res.redirect("/posts");
});
app.use("/posts", postRouter);

app.all("*", async (req, rex, next) => {
  try {
    next({
      messages: "Not found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

// ? set ports
// ////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
