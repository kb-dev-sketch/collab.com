import mongoose from "mongoose";
const campaignSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    niches: [
      {
        type: String,
        required: true,
        enum: [
          "Technology",
          "Fashion",
          "Food",
          "Travel",
          "Finance",
          "Educating",
          "Gaming",
          "Healthcare",
          "Beauty",
          "Lifestyle",
          "other",
        ],
      },
    ],
    platforms: [
      {
        type: String,
        enum: [
          "Instagram",
          "YouTube",
          "TikTok",
          "Twitter",
          "LinkedIn",
          "Facebook",
        ],
      },
    ],
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    requirements: {
      type: String,
      default: " ",
      trim: true,
    },
    deliverables: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Active", "Completed", "Cancelled"],
    },
  },
  { timestamps: true },
);

export const Campaign = mongoose.model("Campaign", campaignSchema);
