import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    content: {
      type: String,
    },
    folderId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("note", noteSchema);
export default NoteModel;
