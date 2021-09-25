const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      versionKey: false,
      transform: function (doc, ret) {
        delete ret.id;
      },
    },
  }
);

module.exports = mongoose.model("Comment", commentSchema);
