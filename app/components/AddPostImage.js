import React, { useState ,useEffect} from 'react';
import PhotoCards from "@/app/components/NewPost/PostPhotoLists/PhotoCards/PhotoCards";
import styles from "@/app/components/NewPost/newpost.module.css";
import {BiSolidImageAdd} from "react-icons/bi";
import Swal from "sweetalert2";

const ImageUpload = ({sendDataToParent}) => {
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedImages = localStorage.getItem('uploadedImages');
            if (storedImages) {

                setUploadedImages(JSON.parse(storedImages));
                sendDataToParent(uploadedImages);
            }
        }
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        let images = [...uploadedImages];

        const totalImages = uploadedImages.length + files.length;

        if (totalImages > 3) {
            return Toast.fire({
                icon: "error",
                title: "Post must not be blank!!!"
            });

        }

        files.forEach((file) => {
            if (images.length < 3) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Image = e.target.result;
                    images.push(base64Image);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('uploadedImages', JSON.stringify(images));
                    }
                    setUploadedImages([...images]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    console.log(uploadedImages);

    const handleImageRemove = (index) => {
        let images = [...uploadedImages];
        images.splice(index, 1);
        if (typeof window !== 'undefined') {
            localStorage.setItem('uploadedImages', JSON.stringify(images));
        }
        setUploadedImages([...images]);
    };

    return (
        <div className={`flex`}>
            <label htmlFor="fileInput"
                   className={`flex items-center cursor-pointer ml-4 px-2 py-2 rounded ${styles.addImageBtn}`}>
                <BiSolidImageAdd size={45} className="text-slate-400 text-sm"/>
                <h2 className="text-slate-400">Add Images</h2>
            </label>
            <input type="file" accept="image/*"
                   id="fileInput"
                   className={`hidden`}

                   multiple onChange={handleImageUpload}/>
            {uploadedImages.map((image, index) => (
                <PhotoCards key={index} url={image}
                            handleDelete={() => handleImageRemove(index)}/>

            ))}
        </div>
    );
};

export default ImageUpload;
