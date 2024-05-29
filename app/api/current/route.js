import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/app/models/user";
import { connectDb } from "@/app/helper/db";
import { parse } from "cookie";
export const GET = async (request) => {

    await connectDb();

    const cookies = parse(request.headers.cookie || "");

    const loginToken=request.cookies.get("loginEduEcho")?.value;
    try {
        if (!loginToken) {
            throw new Error("Login token not found.");
        }

        const data = jwt.verify(loginToken, process.env.JWT_KEY);

        const user = await User.findById(data._id).select("-password");

        if (!user) {
            throw new Error("User not found.");
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error in GET /api/current/route:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
};