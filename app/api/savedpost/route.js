import { Post } from "@/app/models/newpost";
import { NextResponse } from "next/server";


export async function addSavedUser(postId, userId, username, userProfileUrl) {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                message: "Post not found",
                status: false,
            };
        }

        const savedIndex = post.savedUsers.findIndex(user => user.userId === userId);

        if (savedIndex === -1) {
            // User hasn't saved the post, so save it
            const newSavedUser = {
                userId,
                username,
                userProfileUrl
            };

            post.savedUsers.push(newSavedUser);
            await post.save();

            return {
                message: "Post saved successfully!",
                status: true,
            };
        } else {
            // User has already saved the post, so unsave it
            post.savedUsers.splice(savedIndex, 1);
            await post.save();

            return {
                message: "Post unsaved successfully!",
                status: true,
            };
        }
    } catch (e) {
        console.log("catch block", e);
        return {
            message: "Failed to toggle save status of post",
            status: false,
        };
    }
}


export const POST = async (req) => {
    try {
        const { postId, userId, username, userProfileUrl } = await req.json();
        const response = await addSavedUser(postId, userId, username, userProfileUrl);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error in POST /api/saved-users:", error);
        return NextResponse.json({ message: "Failed to toggle save status of post" }, { status: 500 });
    }
};
