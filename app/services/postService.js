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
