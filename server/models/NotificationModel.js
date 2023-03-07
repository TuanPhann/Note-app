import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = mongoose.model("notification", notificationSchema);
export default NotificationModel;
