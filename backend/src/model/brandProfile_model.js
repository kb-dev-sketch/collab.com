import mongoose from "mongoose";
const brandSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      required: true,
      trim: true,
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
    website: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      maxLength: 1000,
      default: "",
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-100", "201-500", "500+"],
      default: "1-10",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    socials: {
      instagram: {
        type: String,
        trim: true,
        default: "",
      },
      linkedin: {
        type: String,
        trim: true,
        default: "",
      },
      x: {
        type: String,
        trim: true,
        default: "",
      },
    },
    totalCampaigns: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 0,
    },
    totalReviews: {
      type: Boolean,
      default: 0,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Search indexes

brandSchema.index({ companyName: 1 });
brandSchema.index({ industry: 1 });
brandSchema.index({ location: 1 });

export const Brand = mongoose.model("Brand", brandSchema);
