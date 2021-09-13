const express = require("express");
const router = express.Router();
const axios = require("axios");

// const PostController = require("../controllers/posts");

// POSTS
router.get("", async function (req, res) {
  try {
    const response = await axios.get("https://localhost:3000/posts/");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  res.render("frontpage");
});
// router.get("/:id", PostController.getPostById);
// router.post("/", PostController.createPost);
// router.put("/:id", PostController.updatePost);
// router.delete("/:id", PostController.deletePost);

module.exports = router;
