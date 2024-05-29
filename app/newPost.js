"use server";

import cloudinary from 'cloudinary';
import {Post} from "@/app/models/newpost";
import {User} from "@/app/models/user";

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});


async function uploadPhotoToCloudinary(newFiles){
    if (!newFiles || newFiles.length === 0) {
        // Return an empty array if no files to upload
        return [];
    }
    const multiplePhotosPromise=newFiles.map(file=>(
        cloudinary.v2.uploader.upload(file, { folder:'post_image'
        })
    ))
    return await Promise.all(multiplePhotosPromise);
}


export async function NewPosting(name,id,profileUrl,textField,visibility,formData){
    try {
        const newFiles = await uploadPhotoToCloudinary(formData);



        const postImages = newFiles.map(photo => ({
            public_id: photo.public_id,
            secure_url: photo.secure_url
        }));

        console.log(postImages);

        const post =await new Post({
            post:textField,
            userId:id,
            username:name,
            visibility:visibility,
            userProfileUrl:profileUrl,
            postImages:postImages,
            comments:[],
            likes:[],
            savedUsers:[]
        });

        await post.save();

        console.log(post);

        return {
            message: "Posted!!",
            status: true,
        };


    }
    catch (e) {

        console.log("catch block",e);

        return {
            message: "Failed to Post!!",
            status: false,
        };
    }

}

export async function AddComment(postId, userId, username, userProfileUrl, commentText) {
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
export async function AddLike(postId, userId, username, userProfileUrl,designation) {
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

            await RemoveLike(postId,userId);

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

export async function RemoveLike(postId, userId) {
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

export async function ToggleCommentApproval(postId, commentId) {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                message: "Post not found",
                status: false,
            };
        }

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return {
                message: "Comment not found",
                status: false,
            };
        }

        // Toggle the approved status
        const isApproved = post.comments[commentIndex].approved;
        post.comments[commentIndex].approved = !isApproved;

        await post.save();

        // Update the user's coins
        const userId = post.comments[commentIndex].userId;
        const user = await User.findById(userId);
        if (user) {
            user.coins += isApproved ? -100 : 100;
            await user.save();
        }

        return {
            message: `Comment ${post.comments[commentIndex].approved ? 'approved' : 'disapproved'} successfully!`,
            status: true,
        };
    } catch (e) {
        console.log("catch block", e);
        return {
            message: "Failed to toggle comment approval",
            status: false,
        };
    }
}

export async function AddSavedUser(postId, userId, username, userProfileUrl) {
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