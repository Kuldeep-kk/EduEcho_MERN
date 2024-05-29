import {httpAxios} from "../helper/httpHelper";

export async function getAllPost(){

    const result=await httpAxios
        .get("/api/post")
        .then((response)=> response.data);
    return result;
}

export async function deletePost(postId){
    const result=await httpAxios
        .delete(`/api/post/${postId}`)
        .then((response)=>response.data);
    return result;
}


export const likePost=async (postId, userId, username, userProfileUrl, designation)=>{

    const result=await httpAxios
        .post('/api/likepost',{postId, userId, username, userProfileUrl, designation})
        .then((response)=>response.data);
    return result;

}

export const commentPost=async (postId, userId, username, userProfileUrl, commentText)=>{

    const result=await httpAxios
        .post('/api/comment',{postId, userId, username, userProfileUrl, commentText})
        .then((response)=>response.data);
    return result;

}

export const savedPost=async (postId, userId, username, userProfileUrl)=>{

    const result=await httpAxios
        .post('/api/savedpost',{postId, userId, username, userProfileUrl})
        .then((response)=>response.data);
    return result;

}


