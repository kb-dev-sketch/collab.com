import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: " ",
    },

    niches: [
      {
        type: String,
        trim: true,
        enum: [
          "technology",
          "gaming",
          "Education",
          "Fitness",
          "fashion",
          "finance",
          "Travel",
          "Food",
          "LifeStyle",
          "Business",
          "Entertainment",
        ],
      },
    ],
    city: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
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
      youtube: {
        type: String,
        trim: true,
        default: "",
      },
      linkedin: {
        type: true,
        trim: true,
        default: "",
      },
      x: {
        type: String,
        trim: true,
        default: "",
      },
    },
    followers: {
      instagram: {
        type: Number,
        default: "",
      },
      youtube: {
        type: Number,
        default: "",
      },
      linkedin: {
        type: Number,
        default: "",
      },
      x: {
        type: Number,
        default: "",
      },
    },
    engagementRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    pricePerPost: {
      type: Number,
      default: 0,
      min: 0,
    },
    portfolioLinks: [
      {
        type: String,
        trim: true,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReview: {
      type: Number,
      default: false,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Discovery /Search Indexes
creatorSchema.index({ niches: 1 });
creatorSchema.index({ city: 1 });
creatorSchema.index({ engagementRate: -1 });
creatorSchema.index({ pricePerPost: 1 });

//compaound Index
creatorSchema.index({
  niches: 1,
  city: 1,
  enagagementRate: -1,
});
export const Creator = mongoose.model("Creator", creatorSchema);
