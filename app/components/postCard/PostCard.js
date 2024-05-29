'use client';
import React, { useContext, useState, memo } from 'react';
import styles from './postcard.module.css';
import { SlLike } from "react-icons/sl";
import { AiFillLike, AiOutlineComment, AiOutlineWhatsApp } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import UserContext from "@/app/context/userContext";
import { AddComment, AddLike, AddSavedUser } from "@/app/newPost";
import { motion } from "framer-motion";
import {IoCloseOutline, IoTicketOutline} from "react-icons/io5";
import {deletePost, likePost, savedPost} from "@/app/services/postService";
import Swal from "sweetalert2";

const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInDays = Math.floor((currentDate - createdAtDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
        return 'Today';
    } else if (differenceInDays === 1) {
        return 'Yesterday';
    } else {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${createdAtDate.getDate()} ${monthNames[createdAtDate.getMonth()]}`;
    }
};

const PostCard = memo(({ data, username, userProfileUrl, post, postImages, createdAt }) => {
    const context = useContext(UserContext);
    const [showMore, setShowMore] = useState(false);

    const isLike = context?.posts.find(post => post._id === data?._id)?.likes.some(like => like.userId === context.user?._id);
    const isSaved = context?.posts.find(post => post._id === data?._id)?.savedUsers.some(user => user.userId === context.user?._id);

    const handleLikes = async () => {

        const result = await likePost(data._id, context.user?._id, context.user?.name, context.user?.secure_url, context.user?.designation);
        await context.loadPost();
        console.log(result.status ? "You liked" : "It's already liked by you", result);
    };

    const handleSave = async () => {
        const result = await savedPost(data._id, context.user?._id, context.user?.name, context.user?.secure_url);
        await context.loadPost();
        console.log(result.status ? result.message : "It's already saved by you", result);
    };

    const handleShare = () => {
        const encodedMessage = encodeURIComponent(post);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    const toggleShowMore = () => setShowMore(!showMore);

    const delPost=async (id)=>{
        const result=await deletePost(id);
        console.log(result);
        await context.loadPost();

    }
    const warnDel=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                delPost(id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }



    return (
        <motion.div className={`px-5 ${styles.mainCard}`}>
            {context.user?.name === username?
                <IoCloseOutline size={30} className={`absolute top-2 right-2 text-slate-300
                 transition delay-100 active:scale-90 hover:scale-110 hover:text-slate-500 
                 hover:cursor-pointer`} onClick={()=>warnDel(data._id)}/> : <></>
            }
            <div className={`flex justify-between items-center py-3 gap-2`}>
                <div className={`flex items-center gap-2`}>
                    <img src={userProfileUrl} alt={'profile pic'} className={`w-14 rounded-full drop-shadow-xl`} />
                    <div className={`flex flex-col`}>
                        <h2 className={`text-slate-600 font-semibold capitalize`}>{username}</h2>
                        <p className={`text-sm text-slate-400`}>Lovely Professional University</p>
                        <p className={`text-pink-400 text-xs`}>{formatDate(createdAt)}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 text-lg text-slate-500 pr-10 hover:cursor-pointer`} onClick={handleSave}>
                    { isSaved ? <><IoTicketOutline className={`text-slate-400`} size={25} />Saved</> :<><BsPlusLg className={`text-slate-400`} size={25} />Save</>}
                </div>
            </div>
            <div className={`text-slate-500 px-5 pb-5  ${styles.mainProblemStatement}`}>
                {showMore ? post.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                )) : (
                    <>
                        {post.split('\n').slice(0, 2).join('\n')}
                        {post.split('\n').length > 2 && (
                            <button onClick={toggleShowMore} className="text-blue-500">Show more</button>
                        )}
                    </>
                )}
                {showMore && post.split('\n').length > 2 && (
                    <button onClick={toggleShowMore} className="text-blue-500">Show less</button>
                )}
            </div>
            <div className={` pb-2`} onClick={() => {
                context.setPostDialogData(data);
                context.setOpenPostPage(true);
            }}>

                {postImages.length === 1 && (
                    <img
                        key={postImages[0]._id}
                        src={postImages[0].secure_url}
                        alt="Post image 1"
                        className="w-full drop-shadow-xl rounded"
                        style={{height: 'auto'}}
                    />
                )}
                {postImages.length === 2 && (
                    <div className=" grid grid-cols-2 justify-center items-center gap-2">
                        <img
                            key={postImages[0]._id}
                            src={postImages[0].secure_url}
                            alt={`Post image 1`}
                            className="w-full bg-green-200 drop-shadow-xl rounded"
                            style={{height: 'auto'}}
                        />
                        <img
                            key={postImages[1]._id}
                            src={postImages[1].secure_url}
                            alt={`Post image 2`}
                            className="w-full bg-green-200 drop-shadow-xl rounded"
                            style={{height: 'auto'}}
                        />
                    </div>
                )}
                {postImages.length === 3 && (
                    <div className=" grid grid-cols-3 justify-center items-center">
                        <img
                            key={postImages[0]._id}
                            src={postImages[0].secure_url}
                            alt="Post image 1"
                            className="col-span-2 bg-blue-100 drop-shadow-xl rounded"
                            style={{height: 'auto'}}
                        />
                        <div className="grid grid-rows-2  col-span-1">
                            <img
                                key={postImages[1]._id}
                                src={postImages[1].secure_url}
                                alt="Post image 2"
                                className="bg-green-200 drop-shadow-xl rounded"
                                style={{height: 'auto'}}
                            />
                            <img
                                key={postImages[2]._id}
                                src={postImages[2].secure_url}
                                alt="Post image 3"
                                className="bg-green-200 drop-shadow-xl rounded"
                                style={{height: 'auto'}}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className={`flex justify-between px-10 py-1`}>
                <div className={`flex items-center`}>
                    {context?.posts.find(post => post._id === data?._id)?.likes.length > 0 && (
                        <div
                            className={`flex items-center hover:cursor-pointer transition delay-100 active:scale-90 hover:scale-105`}
                            onClick={() => {
                                context.setLikePageDataId(data._id);
                                context.setOpenLikeDialog(true);
                            }}>
                            <AiFillLike size={20} className={`transform scale-x-[-1] text-blue-300`}/>
                            <h2 className={`text-slate-400`}>{context?.posts.find(post => post._id === data?._id)?.likes.length}</h2>
                        </div>
                    )}
                </div>
                <div className={`flex items-center gap-2`}>
                    {context?.posts.find(post => post._id === data?._id)?.comments.length > 0 && (
                        <>
                            <h2 className={`text-slate-400`}>{context?.posts.find(post => post._id === data?._id)?.comments.length}</h2>
                            <h2 className={`text-slate-400`}>comments</h2>
                        </>
                    )}
                </div>
            </div>
            <hr/>
            <div className={`flex justify-between items-center py-3`}>
                <div
                    className={`flex justify-center items-center gap-2 w-1/3 text-slate-500 transition delay-100 hover:scale-105 active:scale-90 hover:cursor-pointer`}
                    onClick={handleLikes}>
                    <SlLike className={`transform scale-x-[-1] ${isLike ? `text-blue-300` : `text-slate-400`}`}
                            size={25}/> Like
                </div>
                <div className={`flex justify-center items-center gap-2 w-1/3 text-slate-500 hover:cursor-pointer`} onClick={() => {
                    context.setPostDialogData(data);
                    context.setOpenPostPage(true);
                }}>
                    <AiOutlineComment size={30}/>Comments
                </div>
                <div className={`flex justify-center items-center gap-2 w-1/3 text-slate-500`} onClick={handleShare}>
                    <AiOutlineWhatsApp size={25} /> Share
                </div>
            </div>
        </motion.div>
    );
});

export default PostCard;
