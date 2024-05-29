import {Post} from "@/app/models/newpost";
import {NextResponse} from "next/server";

export const GET=async ()=>{

    try{
        const postData=await Post.find();

        return NextResponse.json(postData);
    } catch (error) {
        console.error("Error in GET /api/posts/route:", error);
    }

}

export const POST=async ()=>{

    return NextResponse.json("kk");
}