import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "proposal_received",
        "proposal_accepted",
        "new_message",
        "campaign_completed",
        "counter_offer",
        "review_received",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    referenceModel: {
      type: String,
      enum: ["Proposal", "Campaign", "Message", "Review"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

notificationSchema.index({
  receipientId: 1,
  createdAt: -1,
});

export const Notification = mongoose.model("Notification", notificationSchema);
