import mongoose, { Schema } from "mongoose";

const SavedUserSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    userProfileUrl: {
        type: String,
        required: [true, "User profile URL is required"],
    }
}, {
    timestamps: true
});


const CommentSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    userProfileUrl: {
        type: String,
        required: [true, "User profile URL is required"],
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
    approved: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const LikeSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    designation:{
      type:String,
    },
    userProfileUrl: {
        type: String,
        required: [true, "User profile URL is required"],
    }
}, {
    timestamps: true
});

const PostSchema = new Schema({
    post: {
        type: String,
        required: [true, "Post description is required"],
    },
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    userProfileUrl: {
        type: String,
        required: [true, "User profile URL is required"],
    },
    visibility: {
        type: Boolean,
        default: false,
    },
    postImages: [{
        public_id: String,
        secure_url: String
    }],
    comments: [CommentSchema],
    likes: [LikeSchema],
    savedUsers: [SavedUserSchema]
}, {
    timestamps: true
});

export const Post = mongoose.models.posts || mongoose.model("posts", PostSchema);
