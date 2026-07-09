import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
      unique: true,
      index: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
      index: true,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
      index: true,
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },
    lastMessage: {
      type: String,
      default: "",
      trim: true,
      maxLength: 1000,
    },
    lastMessageAt: {
      type: Date,
      default: null,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// fast chat list
chatSchema.index({ creatorId: 1, lastMessageAt: -1 });
chatSchema.index({ brandId: 1, lastMessageAt: -1 });

export const Chat = mongoose.model("Chat", chatSchema);
