const { Post, Comment } = require("../models");

class PostController {
  async getAllPosts(req, res, next) {
    try {
      const data = await Post.find().populate("comments");
      if (data.length === 0) {
        return next({ message: "Posts not found", statusCode: 404 });
      }

      data.forEach((post) => {
        post.content = post.content.replace(/[^a-zA-Z ]/g, "");
      });

      res.render("index", { posts: data });
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const data = await Post.findById(req.params.id).populate("comments");
      if (!data) {
        return next({ message: "Post not found", statusCode: 404 });
      }

      res.render("post", { post: data });
    } catch (error) {}
  }

  async getPostData(req, res, next) {
    try {
      const data = await Post.findById(req.params.id);
      if (!data) {
        return next({ message: "Post not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {}
  }

  async createPost(req, res, next) {
    try {
      const newPost = await Post.create(req.body);

      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const newPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!newPost) {
        return next({ statusCode: 404, message: "Post not found" });
      }

      res.status(201).json({ newPost });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      console.log("DELETING");
      const postToDelete = await Post.findByIdAndDelete(req.params.id);

      if (!postToDelete) {
        return next({ statusCode: 404, message: "Post not found" });
      }

      res.status(200).json({ message: "Post successfully deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

class PostRenderer {
  async renderCreate(req, res, next) {
    try {
      res.render("createPost");
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  PostController: new PostController(),
  PostRenderer: new PostRenderer(),
};
