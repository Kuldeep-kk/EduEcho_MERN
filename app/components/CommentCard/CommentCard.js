'use client';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from "@/app/context/userContext";
import styles from './commentcard.module.js.css';
import {PiHandshakeFill} from "react-icons/pi";
import {ToggleCommentApproval} from "@/app/newPost";
import {MdDoneAll} from "react-icons/md";
import {AnimatePresence, motion, useAnimation} from "framer-motion";

const CommentCard = ({comment, createdAt,userId,userProfileUrl,username,_id,approved}) => {

    const context=useContext(UserContext);

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

    const [showMore, setShowMore] = useState(false);

    const lines = comment.split('\n');
    const firstTwoLines = lines.slice(0, 2).join('\n');

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    console.log(username,approved);

    const [showApproveBtn,setShowApproveBtn]=useState(false);
useEffect(()=>{
    if(!(context.user._id === userId) && (context.user._id === context.postDialogData.userId)){
        console.log(comment);
        setShowApproveBtn(true);
    }
},[]);

const handleApproveFunction=async ()=>{

    try{
        const res=await ToggleCommentApproval(context.postDialogData._id,_id);
        await context.loadPost();
        await context.getUsers();
        console.log(res);
    }
    catch (e) {
        console.log(e);

    }
}

    return (
        <div className={` bg-slate-200 rounded-2xl`}>
            <div className={`  p-2 `}>
                <div className={`flex justify-between`}>
                    <div className={`flex `}>
                        <img src={userProfileUrl} className={`w-10 rounded-full`}/>
                        <div>
                            <h2 className={`capitalize text-slate-400 text-sm`}>{username}</h2>
                            <h2 className={`text-xs text-slate-400`}>Lovely Professional University</h2>
                        </div>
                    </div>
                    <div className={`text-pink-400 text-xs`}>{formatDate(createdAt)}</div>

                </div>
                <div
                    className={`text-slate-500 transition duration-300 delay-300 overflow-y-auto text-sm p-2 `}>
                    {showMore ? (lines.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br/>
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
            </div>
            {showApproveBtn &&
                <div className={`flex flex-col justify-center items-center bg-slate-300 rounded-b-2xl`}>
                    <button className={`text-slate-500 flex justify-center items-center`} onClick={handleApproveFunction}>
                        <AnimatePresence mode="wait">
                            {approved ? (
                                <motion.div
                                    key="approved"
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex justify-center items-center overflow-hidden"
                                >
                                    <MdDoneAll size={25} />Approved
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="approve"
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex justify-center items-center overflow-hidden"
                                >
                                    <PiHandshakeFill size={25} /> Approve
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                </div>}

        </div>

    );
};

export default CommentCard;