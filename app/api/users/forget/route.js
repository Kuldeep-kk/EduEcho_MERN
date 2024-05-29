import {parse} from "cookie";
import {getResponseMessage} from "@/app/helper/getResponseMessage";

import bcrypt from "bcryptjs";
import {User} from "@/app/models/user";


export const PUT = async (request)=>{

    const {email,password} = await request.json();


    try{
        const newPassword=bcrypt.hashSync
        (password,parseInt(process.env.BCRYPT_SALT));

        const updatePassword = await User.updateOne(
            {
                email:email,

            },
            {
                $set:{
                    password:newPassword,
                }

            }
            );

        return getResponseMessage("Password Reset Successfully",200,true);


    }
    catch (e) {

        console.log(e);
        return getResponseMessage("Failed to Reset Password",500,false);

    }


}