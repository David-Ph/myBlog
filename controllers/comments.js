const { Post, Comment } = require("../models");

class CommentController {
  async getAllComments(req, res, next) {
    // find post
    const relatedPost = await Post.findById(req.params.postId).populate(
      "comments"
    );

    const comments = relatedPost.comments;

    res.status(200).json({ comments });
  }

  async getOneComment(req, res, next) {
    try {
      //   const relatedPost = await Post.findById(req.params.postId).populate(
      //     "comments"
      //   );
      //   const comment = relatedPost.comments.filter((comment) => {
      //     return comment._id == req.params.commentId;
      //   });

      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next({ message: "Comment not found", statusCode: 404 });
      }

      res.status(200).json({ comment });
    } catch (error) {
      next(error);
    }
  }

  async createComment(req, res, next) {
    let relatedPost = await Post.findById(req.params.postId);

    // create new comment
    let newComment = new Comment({
      name: req.body.name,
      content: req.body.content,
      post: req.params.postId,
    });

    // save comment
    await newComment.save();

    // ? push the comment to post comments array
    relatedPost.comments.push(newComment);

    // ? save the post!
    await relatedPost.save();

    res.status(201).json({ message: "Comment successfully created!" });
  }

  async updateComment(req, res, next) {
    try {
      const commentToEdit = await Comment.findOneAndUpdate(
        {
          _id: req.params.commentId,
        },
        req.body,
        { new: true }
      );

      if (!commentToEdit) {
        return next({ statusCode: 404, message: "Comment not found" });
      }

      res.status(200).json({ commentToEdit });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentToDelete = await Comment.findByIdAndDelete(
        req.params.commentId
      );

      if (!commentToDelete) {
        return next({ statusCode: 404, message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment successfully deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
