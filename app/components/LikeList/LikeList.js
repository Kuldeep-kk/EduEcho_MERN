import React, {useContext} from 'react';
import styles from './likelist.module.css';
import {RxCross2} from "react-icons/rx";
import UserContext from "@/app/context/userContext";
import {AiFillLike} from "react-icons/ai";

const LikeList = () => {
    const context=useContext(UserContext);

    return (
        <div className={`${styles.main} w-[300px] h-[400px] `}>
            <div className={`p-4 `}>
                <div className={`text-xl font-semibold text-slate-500`}>Likes</div>
                <div><RxCross2 size={30}
                               className={`cursor-pointer text-slate-400 absolute top-2 right-4 active:rotate-90 transition delay-100 hover:rotate-90`}
                               onClick={() => context.setOpenLikeDialog(false)}/></div>
            </div>
            <div className={`overflow-y-auto h-80 mr-1`}>
                {context.posts.filter(post => post._id === context.likePageDataId)[0]?.likes.map((item)=>(
                    <div className={`flex justify-between items-center p-2 ${styles.cardList} m-2`}>
                        <div className={`flex justify-center items-center gap-2`}>
                            <img src={item.userProfileUrl} className={`w-14 rounded-full`}/>
                            <div className={`capitalize flex flex-col`}>
                                <h2 className={`text-slate-500`}>{item.username}</h2>
                                <h2 className={`text-blue-400 text-xs`}>{item.designation}</h2>
                            </div>
                        </div>
                        <div>
                            <AiFillLike
                                className={` text-blue-400 `} size={20}/>
                        </div>


                    </div>

                    ))
                }
            </div>

        </div>
    );
};

export default LikeList;