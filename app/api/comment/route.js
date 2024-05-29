import { Post } from "@/app/models/newpost";
import { NextResponse } from "next/server";


export async function addComment(postId, userId, username, userProfileUrl, commentText) {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                message: "Post not found",
                status: false,
            };
        }

        const newComment = {
            userId,
            username,
            userProfileUrl,
            comment: commentText,
        };

        post.comments.push(newComment);

        await post.save();

        return {
            message: "Comment added successfully!",
            status: true,
        };
    } catch (e) {
        console.log("catch block", e);
        return {
            message: "Failed to add comment",
            status: false,
        };
    }
}


export const POST = async (req) => {
    try {
        const { postId, userId, username, userProfileUrl, commentText } = await req.json();
        const response = await addComment(postId, userId, username, userProfileUrl, commentText);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error in POST /api/comments:", error);
        return NextResponse.json({ message: "Failed to add comment" }, { status: 500 });
    }
};
