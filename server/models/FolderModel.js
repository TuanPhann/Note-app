import mongoose from "mongoose";
const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    authorId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const FolderModel = mongoose.model("folder", folderSchema);
export default FolderModel;
