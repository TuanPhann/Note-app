import AuthorModel from "../models/AuthorModel.js";
import FolderModel from "../models/FolderModel.js";
import NoteModel from "../models/NoteModel.js";
import { GraphQLScalarType } from "graphql";
import { PubSub } from "graphql-subscriptions";
import NotificationModel from "../models/NotificationModel.js";

const pubsub = new PubSub();

export const resolvers = {
  //conver date
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    //lấy tất cả folder trong DB
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });
      return folders;
    },

    // lấy ra 1 folder có cùng ID
    folder: async (parent, args) => {
      const foundFolder = await FolderModel.findOne({
        _id: args.folderId,
      });
      return foundFolder;
    },

    // lấy ra note tương ứng với folder
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },

  Folder: {
    // lấy ra author  tương ứng với folder
    author: async (parent, args) => {
      const author = await AuthorModel.findOne({
        uid: parent.authorId,
      });
      return author;
    },

    //lấy ra tất cả note thuộc folder
    notes: async (parent, args) => {
      const authorId = parent.id;
      const notes = await NoteModel.find({
        folderId: authorId,
      }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder",
        },
      });
      await newFolder.save();
      return newFolder;
    },

    register: async (parent, args) => {
      const foundAuthor = await AuthorModel.findOne({
        uid: args.uid,
      });

      if (!foundAuthor) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundAuthor;
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },

    updateNote: async (parent, args) => {
      const noteId = args.id;
      console.log(args);
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    pushNotification: async (parent, args) => {
      const newNotification = new NotificationModel(args);
      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.content,
        },
      });
      await newNotification.save();
      return { message: "SUCCESS" };
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
