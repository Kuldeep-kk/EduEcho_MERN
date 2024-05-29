import {getResponseMessage} from "@/app/helper/getResponseMessage";
import {User} from '@/app/models/user';
import {connectDb} from "@/app/helper/db";

connectDb();

export const PUT=async (request)=>{

    const {email}=await request.json();



    console.log(email);

    try {

        const emailExists = await User.findOne({email});

        if(emailExists){
            return getResponseMessage("Email already exists",200,false);
        }
        else
        {
            return getResponseMessage("Email is unique",200,true);
        }

    }
    catch (e) {
        console.log(e);
        return getResponseMessage("Failed to check email",500,false);

    }

}