const express = require("express");
const router = express.Router();

const { PostController, PostRenderer } = require("../controllers/posts");

// POSTS
router.get("/", PostController.getAllPosts); // * get posts and show front page
router.get("/create", PostRenderer.renderCreate); // * render create a new post page
router.get("/:id", PostController.getPostById);
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;
