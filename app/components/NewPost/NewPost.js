"use client";
import React, {useContext, useRef, useState} from 'react';
import styles from './newpost.module.css';
import UserContext from "@/app/context/userContext";
import {IoMdArrowDropdown} from "react-icons/io";
import {RxCross2} from "react-icons/rx";
import {BiSolidImageAdd, BiSolidMessageSquareAdd} from "react-icons/bi";

import PhotoCards from "@/app/components/NewPost/PostPhotoLists/PhotoCards/PhotoCards";

import Swal from "sweetalert2";
import {NewPosting, revalidate} from "@/app/newPost";
import AddPostImage from "@/app/components/AddPostImage";
import {RotateLoader, ScaleLoader, SyncLoader} from "react-spinners";
import {FaWandMagicSparkles} from "react-icons/fa6";
import {openaiFn} from "@/app/services/openaiService";


const NewPost = () => {

    const context=useContext(UserContext);
    const [user,setUser]=useState(context.user);
    const [textField,setTextField]=useState("");
    const [visibility,setVisibility]=useState(true);
    const [childData, setChildData] = useState('');
    const [loading,setLoading]=useState(false);
    const [aiLoading,setAiLoading]=useState(false);

    const handleChildData = (data) => {
        setChildData(data);
    };

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

    const rephraseFn=async ()=>{
        setAiLoading(true);
        try {

            const res=await openaiFn(JSON.stringify(textField));

            if (res.success) {
                console.log(res.text);
                setTextField(res.text);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {

        }
        setAiLoading(false);
    }



    async function handlePost(){
        const storageKey = 'uploadedImages';

        if (!textField.trim()) {
            return Toast.fire({
                icon: "error",
                title: "Post must not be blank!!!"
            });
        }
        setLoading(true);
        try{

            const imgDataURL = localStorage.getItem(storageKey);

                const res = await NewPosting(context.user?.name,context.user?._id,context.user?.secure_url,textField,visibility,JSON.parse(imgDataURL));

            await context.loadPost();

                if(res.status){
                    Toast.fire({
                        icon: "success",
                        title: "Posted!!!"
                    });



                }
                else{
                     Toast.fire({
                        icon: "error",
                        title: "Something went wrong!!!"
                    });

                }



        }
        catch (e) {
            console.log(e);

        }


        setLoading(false);

        setTextField("");
        context.setOpenNewPost(false);
        localStorage.removeItem(storageKey);

    }



    return (
        <div className={`${styles.mainDialog} w-[350px] md:w-[750px] pb-5  `}>
            <div className={`flex justify-between items-center p-4`}>
                <div className={`flex justify-center items-center gap-2 ${styles.profileSection} px-3 py-1 transition delay-100 hover:scale-105 active:scale-90`}  onClick={()=>setVisibility(!visibility)}>

                    <div>
                        <img className={`w-16 rounded-full p-1 hover:cursor-pointer transition delay-50 active:scale-90`}
                            src={user?.secure_url}/>

                    </div>
                    <div>
                        {user && <div className={`text-lg capitalize font-semibold text-slate-600 flex items-center justify-between `}>
                            {user.name} <IoMdArrowDropdown size={25} />
                        </div>}
                        <div className={`text-slate-500 text-sm`}>{visibility ? 'Post to Everyone' :'Post to Master'}</div>
                    </div>


                </div>
                <div><RxCross2 size={30} className={`cursor-pointer text-slate-400 absolute top-2 right-4 active:rotate-90 transition delay-100 hover:rotate-90`} onClick={()=> context.setOpenNewPost(false)}/></div>

            </div>
            <div>

                <textarea className={` w-full h-72 p-3 text-lg resize-none ${styles.myTextBox}`} placeholder={'What do you want to ask ?'}
                onChange={(e)=> setTextField(e.target.value)}
                          value={textField}
                />
                <div className={`flex flex-col md:flex-row justify-between `}>
                    <div><AddPostImage sendDataToParent={handleChildData}/></div>
                    <div className={`flex justify-center items-center ${styles.rephraseBtn} text-white gap-3 m-2 p-2 w-32 transition delay-100 active:scale-90 hover:cursor-pointer `} onClick={rephraseFn} >{!aiLoading ? (<><FaWandMagicSparkles size={25} className={`text-white`}/>Rephrase </>) : (<><ScaleLoader color="#ffffff" height={20} /></>)}</div>

                </div>

            </div>

            <button
                className={`${styles.postBtn}  mx-auto w-32 py-2 text-white flex justify-center items-center transition delay-100 hover:scale-105 active:scale-90 gap-2`}
                onClick={handlePost}>
                {loading ? <SyncLoader color="#ffffff" /> : <><BiSolidMessageSquareAdd
                    size={25}/>Post</>}

            </button>




        </div>
    );
};

export default NewPost;