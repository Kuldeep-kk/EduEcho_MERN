import {Post} from "@/app/models/newpost";
import {getResponseMessage} from "@/app/helper/getResponseMessage";


export const DELETE=async (request,{params})=>{
    const {postId}=params;
    console.log(postId)
    try{
        await Post.deleteOne({
            _id:postId,
        });
        return getResponseMessage("Deleted",200,true);
    }
    catch(e){
        console.log(e);
        return getResponseMessage("failed to delete task",404,false);
    }
}