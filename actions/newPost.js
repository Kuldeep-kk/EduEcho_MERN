"use server";
import path from 'path';
import fs from 'fs/promises'
import {v4 as uuidv4} from 'uuid';
import os from "os";
import cloudinary from 'cloudinary';
import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {Post} from "@/app/models/newpost";

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

async function savePhotosToLocal(formData){
    const files= await formData.getAll('files')
    const multipleBuffersPromise = files.map(file =>(
        file.arrayBuffer()
            .then(data=>{
                const buffer = Buffer.from(data);

                const name=uuidv4();
                const ext=file.type.split("/")[1];

                console.log({name,ext})

                //const uploadDir = path.join(process.cwd(),"public",`/${name}.${ext}`)
                //fs.writeFile(uploadDir,buffer);
                //doesn't work in vercel

                const tempDir=  os.tmpdir();
                const  uploadDir = path.join(tempDir,`/${name}.${ext}`)
                fs.writeFile(uploadDir,buffer);

                console.log(uploadDir,file.name);

                return {filePath:uploadDir, filename:file.name}


            })
    ))

    console.log("my buffer promise:",multipleBuffersPromise);

    return await Promise.all(multipleBuffersPromise)

}

async function uploadPhotoToCloudinary(newFiles){
    const multiplePhotosPromise=newFiles.map(file=>(
        cloudinary.v2.uploader.upload(file.filePath, { folder:'post_image'
        })
    ))
    return await Promise.all(multiplePhotosPromise);
}
const delay=(delayInMs)=>{
    return new Promise(resolve => setTimeout(resolve,delayInMs));
}


export async function NewPosting(name,id,profileUrl,textField,visibility,formData){
    try {
        const newFiles = await savePhotosToLocal(formData);

        console.log("newFile:",newFiles);
        const photos = await uploadPhotoToCloudinary(newFiles)

        await delay(2000);

        console.log("myPhotos:",photos);

        const postImages = photos.map(photo => ({
            public_id: photo.public_id,
            secure_url: photo.secure_url
        }));
        newFiles.map(file=>fs.unlink(file.filePath));

        //
        // const post =await new Post({
        //     post:textField,
        //     userId:id,
        //     username:name,
        //     userProfileUrl:profileUrl,
        //     postImages:postImages
        // });
        //
        // await post.save();
        //
        // console.log(post);

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

export async function revalidate(path){
    revalidatePath(path);
}