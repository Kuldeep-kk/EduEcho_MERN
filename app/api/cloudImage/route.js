import cloudinary from "cloudinary";



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



async function uploadImgToCloud(blob) {
    try {
        const result = await cloudinary.v2.uploader.upload(blob, {
            folder: 'nextjs_upload/users',
        });

        return result;
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
    }
}

export async function uploadPhoto(imgURL) {
    try {
        const photo = await uploadImgToCloud(imgURL);
        return photo;
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
    }
}
export async function deletePhoto(public_id){

    try{
        await cloudinary.v2.uploader.destroy(public_id)
        return {msg:'Delete Success!'};
    }
    catch(e){
        return {errMsg:e.message}

    }
}
