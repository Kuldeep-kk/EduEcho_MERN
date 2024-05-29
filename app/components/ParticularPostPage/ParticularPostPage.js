"use client";
import React, {useContext, useEffect, useState} from 'react';
import styles from './particularpostpage.module.css';
import {RxCross2} from "react-icons/rx";
import UserContext from "@/app/context/userContext";
import {SlLike} from "react-icons/sl";
import {AiFillLike, AiOutlineComment, AiOutlineWhatsApp} from "react-icons/ai";
import {FaRegCommentDots} from "react-icons/fa";
import {IoSend} from "react-icons/io5";
import Slider from "react-slick";
import ImageSection from "@/app/components/ParticularPostPage/ImageSection/ImageSection";
import {GrNext, GrPrevious} from "react-icons/gr";
import CommentCard from "@/app/components/CommentCard/CommentCard";
import {AddComment, AddLike} from "@/app/newPost";
import {getAllPost} from "@/app/services/postService";
import FormatDate from "@/app/components/ReUsableFn/formatDate";

const ParticularPostPage = () => {


    const context=useContext(UserContext);
    const [myComment,setMyComment]=useState("");
    const [showMore, setShowMore] = useState(true);
    const [cIndex, setCIndex] = useState(0);

    const lines = context.postDialogData?.post.split('\n');
    const firstTwoLines = lines.slice(0, 2).join('\n');
    const remainingLines = lines.slice(2).join('\n');

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const nextfn = () => {
        setCIndex((prev) => (prev + 1) % context.postDialogData?.postImages.length);
    };
    const prevfn = () => {
        setCIndex((prev) => (prev - 1 +context.postDialogData?.postImages.length) % context.postDialogData.postImages.length);
    };
    const handleComment=async ()=>{
        const result=await AddComment(context.postDialogData._id,context.user?._id,context.user?.name,context.user?.secure_url,myComment);

        console.log(result);
        await context.loadPost();

        setMyComment("");

    }

    const handleLikes= async()=>{
        const result= await AddLike(context.postDialogData._id,context.user?._id,context.user?.name,context.user?.secure_url);

        await context.loadPost();

        if(result.status){
            console.log("You liked");
            console.log(result);

        }
        else{
            console.log("Its already liked by you");
            console.log(result);

        }

    }

    const [isLike,setIsLike]=useState(false);

    useEffect(()=>{
        const kk=context?.posts.filter(post => post._id === context.postDialogData?._id)[0].likes.find(like => like.userId === context.user._id);
        if(kk){
            setIsLike(true);
        }
        else{
            setIsLike(false);
        }
    },[context.posts,context.posts.likes]);
    
    return (
        <div className={`${styles.mainDialog} flex ${!context.postDialogData.postImages[cIndex]?.secure_url ? `w-[350px] h-[550px]` : `w-[950px] h-[550px] `}`}>
            {context.postDialogData.postImages[cIndex]?.secure_url &&
                <div className={`${styles.imageSection} w-2/3 bg-gray-800 flex flex-col justify-center items-center `}>
                    <div className={`flex justify-between items-center`}>
                        <div onClick={prevfn}><GrPrevious
                            className={`text-white hover:text-pink-400 hover:cursor-pointer`} size={30}/></div>
                        <img
                            src={context.postDialogData.postImages[cIndex].secure_url}
                            alt={context.postDialogData.postImages[cIndex]}
                            width={500}

                            className={``}
                        />
                        <div onClick={nextfn}><GrNext className={`text-white hover:text-pink-400 hover:cursor-pointer`}
                                                      size={30}/></div>
                    </div>

                </div>}

            <div className={`${styles.textSection} ${context.postDialogData.postImages[cIndex]?.secure_url ? ` w-1/3` : `w-full`} px-3`}>
                <div className={`flex gap-2 items-center py-3 `}>
                    <img
                        src={context.postDialogData.userProfileUrl}
                        alt={'profile pic'}
                        className={`w-14 rounded-full drop-shadow-xl`}/>
                    <div className={`flex  flex-col`}>
                        <h2 className={`text-slate-600 font-semibold capitalize`}>{context.postDialogData.username}</h2>
                        <p className={`text-sm text-slate-400`}>Lovely Professional University</p>
                        <p className={`text-pink-400 text-xs flex`}>{FormatDate(context.postDialogData.createdAt)}</p>
                    </div>
                </div>
                <div className={`text-slate-500 transition duration-300 delay-300 ${showMore ? `h-[230px]` : 'h-[100p]'} overflow-y-auto  `}>
                    {showMore ? (lines.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))) : (
                        <>
                            {firstTwoLines}
                            {lines.length > 2 && (
                                <button onClick={toggleShowMore} className="text-blue-500">
                                    Show more
                                </button>
                            )}
                        </>
                    )}
                    {showMore && lines.length > 2 && (
                        <button onClick={toggleShowMore} className="text-blue-500">
                            Show less
                        </button>
                    )}
                </div>
                <hr/>
                <div className={`flex justify-between items-center py-3 `}>
                    <div className={`flex justify-center items-center gap-2 w-1/2`} onClick={handleLikes}><AiFillLike
                        className={`transform scale-x-[-1] ${isLike ? `text-blue-400` : `text-slate-400`}`} size={20}/> Like
                    </div>
                    <div className={`flex justify-center items-center gap-2 w-1/2 text-slate-500`} onClick={toggleShowMore}><AiOutlineComment
                        size={25}/>Comments
                    </div>
                </div>
                <div className={`flex justify-center items-center gap-2 `}>
                    <img src={context.user?.secure_url} className={`w-10 h-10 rounded-full`}/>
                    <div className={`flex w-full ${styles.inputArea} h-14 items-center justify-center px-2 gap-2 `}>
                        <textarea className={`bg-transparent w-full outline-none resize-none h-14 py-2`} placeholder={"Add a solution ... "}
                        onChange={(e)=>setMyComment(e.target.value)}
                                  value={myComment}
                        />
                        <IoSend size={25} color={"#f63389"} onClick={handleComment}/>
                    </div>

                </div>
                <div className={`flex flex-col items-center px-4 mt-5 text-slate-300 overflow-y-auto  gap-2 ${showMore ? `h-24` : `${!context.postDialogData.postImages[cIndex]?.secure_url ? `h-48` : `h-48 `}`}`}>

                    {context?.posts.filter(post => post._id === context.postDialogData?._id)[0].comments.map((item )=> (
                        <CommentCard key={item._id} {...item}/>
                    ))}
                </div>

            </div>
            <RxCross2 size={30}
                      className={`cursor-pointer text-slate-400 absolute top-2 right-4 active:rotate-90 transition delay-100 hover:rotate-90`}
                      onClick={() => context.setOpenPostPage(false)}/>

        </div>
    );
};

export default ParticularPostPage;