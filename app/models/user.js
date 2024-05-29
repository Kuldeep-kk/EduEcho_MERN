import mongoose, {Schema} from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
    },
    email:{
        type:String,
        required:[true,"email Required"],
    },
    password:{
        type:String,
    },
    regno:{
        type:String,
    },
    gender:{
        type: String,
        required: true,
        default:"Not Given"
    },
    coins: {
        type: Number,
        default: 100
    },
    designation: {
        type: String,
    },
    public_id:String,
    secure_url:String

});

export const User = mongoose.models.users || mongoose.model("users",UserSchema);