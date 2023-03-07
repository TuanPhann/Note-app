import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    uid: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuthorModel = mongoose.model("author", authorSchema);

export default AuthorModel;
