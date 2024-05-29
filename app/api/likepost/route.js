import { Post } from "@/app/models/newpost";
import { NextResponse } from "next/server";

// Function to add a like to a post
export async function addLike(postId, userId, username, userProfileUrl, designation) {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                message: "Post not found",
                status: false,
            };
        }

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.some(like => like.userId === userId);

        if (alreadyLiked) {
            await removeLike(postId, userId);

            return {
                message: "User has already liked this post",
                status: false,
            };
        }

        const newLike = {
            userId,
            username,
            userProfileUrl,
            designation,
        };

        post.likes.push(newLike);

        await post.save();

        return {
            message: "Like added successfully!",
            status: true,
        };
    } catch (e) {
        console.log("catch block", e);
        return {
            message: "Failed to add like",
            status: false,
        };
    }
}

// Function to remove a like from a post
export async function removeLike(postId, userId) {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                message: "Post not found",
                status: false,
            };
        }

        // Check if the user has liked the post
        const likeIndex = post.likes.findIndex(like => like.userId === userId);

        if (likeIndex === -1) {
            return {
                message: "User has not liked this post",
                status: false,
            };
        }

        // Remove the like from the likes array
        post.likes.splice(likeIndex, 1);

        await post.save();

        return {
            message: "Like removed successfully!",
            status: true,
        };
    } catch (e) {
        console.log("catch block", e);
        return {
            message: "Failed to remove like",
            status: false,
        };
    }
}


export const POST = async (request) => {
    try {
        const { postId, userId, username, userProfileUrl, designation } = await request.json();
        console.log(postId, userId, username, userProfileUrl, designation);
        const response = await addLike(postId, userId, username, userProfileUrl, designation);
        console.log(response);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error in POST /api/likes:", error);
        return NextResponse.json({ message: "Failed to add like" }, { status: 500 });
    }
};


