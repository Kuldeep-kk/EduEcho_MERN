import {NextResponse} from "next/server";

export async function POST(request){

    const response=NextResponse.json({
        message:"Logged out!!!",
        success:true
    });
    response.cookies.set("loginEduEcho","",{
        expires: new Date(0),
    });

    return response;

}