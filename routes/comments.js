const express = require("express");
const router = express.Router();

// ? import controller
// ///////////////
const CommentController = require("../controllers/comments");

// ? set up routes
// ///////////////
router.get("/:postId/comments/", CommentController.getAllComments);
router.get("/:postId/comments/:commentId", CommentController.getOneComment);
router.post("/:postId/comments/", CommentController.createComment);
router.put("/:postId/comments/:commentId", CommentController.updateComment);
router.delete("/:postId/comments/:commentId", CommentController.deleteComment);

module.exports = router;
