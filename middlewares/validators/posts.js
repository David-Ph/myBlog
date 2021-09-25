const { Post } = require("../../models");
const validator = require;

class PostValidator {
  createPostValidator(req, res, next) {
    try {
      const errorMessages = [];

      if (validator.isEmpty(req.body.title)) {
        errorMessages.push("Title can not be empty");
      }

      if (validator.isEmpty(req.body.content)) {
        errorMessages.push("Content can not be empty");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  updatePostValidator(req, res, next) {
    try {
      const findPost = Post.findOne({ _id: req.params.id });

      req.body.title = req.body.title || findPost.title;
      req.body.content = req.body.content || findPost.content;
      req.body.thumbnails = req.body.thumbnails || findPost.thumbnails;

      const errorMessages = [];

      if (validator.isEmpty(req.body.title)) {
        errorMessages.push("Title can not be empty");
      }

      if (validator.isEmpty(req.body.content)) {
        errorMessages.push("Content can not be empty");
      }

      if (validator.isEmpty(req.body.thumbnails)) {
        errorMessages.push("Thumbnails can not be empty");
      }

      if (!validator.isURL(req.body.thumbnails)) {
        errorMessages.push("Image URL not valid");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostValidator();
