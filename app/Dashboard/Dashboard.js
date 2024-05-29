"use client";
import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from "@/app/PageWrapper";
import Navbar from "@/app/components/Navbar/Navbar";
import UserContext from "@/app/context/userContext";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import ViewProfile from "@/app/components/ViewProfile/ViewProfile";
import NewPost from "@/app/components/NewPost/NewPost";
import PostCard from "@/app/components/postCard/PostCard";
import styles from './dashboard.module.css';
import bgAbs from '@/public/bgAbs.png';
import Image from "next/image";
import troffee from '@/public/leaderBoard.png';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import coins from '@/public/coins.png';
import {FaGraduationCap} from "react-icons/fa";
import {PiClockCounterClockwiseLight} from "react-icons/pi";
import {BsChevronCompactRight, BsMailbox} from "react-icons/bs";
import {FiArrowRight} from "react-icons/fi";
import ParticularPostPage from "@/app/components/ParticularPostPage/ParticularPostPage";
import LeaderCard from "@/app/components/LeaderCard/LeaderCard";
import LikeList from "@/app/components/LikeList/LikeList";
import {useInView} from "react-intersection-observer";
import {AiTwotoneCloseCircle} from "react-icons/ai";
import {IoCloseOutline} from "react-icons/io5";
import {BiSolidMessageSquareAdd} from "react-icons/bi";
import {MdLeaderboard} from "react-icons/md";
import {GiCaptainHatProfile} from "react-icons/gi";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(137,219,255,0.61)' : '#40b1ed',
    },
}));

const Dashboard = () => {
    const context=useContext(UserContext);
    const storageKey = 'uploadedImages';
    const [allPost,setAllPost]=useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const controls = useAnimation();
    const [refOneToOne,inViewOne]=useInView();

    useEffect(()=>{
        let displayUser;
        if (context.user?.designation === "Master") {
            displayUser = context.posts;
        } else {
            displayUser = context.posts?.filter(post => post.visibility || post.userId === context.user?._id);
        }

        setAllPost(displayUser);

        const userPosts = context?.posts.filter(post => post.userId === context.user?._id).slice(-3);
        setRecentPosts(userPosts);


    },[context.posts,context.user?._id]);

    function calculateLevelAndRange(coins) {
        let level, range;

        if (coins <= 1000) {
            level = 1;
            range = Math.floor((coins) / 10);
        } else {
            level = Math.floor((coins - 1) / 1000) + 1;
            const coinsInLevel = (coins - 1) % 1000;
            range = Math.floor((coinsInLevel) / 10);
        }

        return { level, range };
    }

    const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const images = {
        hidden: {
            opacity: 0,
            x: -250,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1
            },
        },
    };

    const rightImages = {
        hidden: {
            opacity: 0,
            x: 250,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1
            },
        },
    };
    useEffect(() => {
        if (inViewOne) {
            controls.start("show");
        }
    }, [controls, inViewOne]);

    useEffect(() => {
        if(context.showMyPost){
            const myFilter=context.posts?.filter(post => post.userId === context.user?._id);

            setAllPost(myFilter);

        }
        else if(context.showSavedPost){

            const filteredPosts = context.posts.filter(post =>
                post.savedUsers.some(savedUser => savedUser.userId === context.user?._id)
            );

            setAllPost(filteredPosts);
        }
        else if(!context.showMyPost && !context.showSavedPost){
            let displayUser;
            if (context.user?.designation === "Master") {
                displayUser = context.posts;
            } else {
                displayUser = context.posts?.filter(post => post.visibility || post.userId === context.user?._id);
            }

            setAllPost(displayUser);

        }
    }, [context.showMyPost,context.showSavedPost]);

    const [openUserCard,setOpenUserCard]=useState(false);
    const [openLeaderBoard,setOpenLeaderBoard]=useState(false);


    return (
        <div className={`${styles.main}`}>
            <div
                className={`sm:hidden fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-2xl text-white flex justify-center items-center transition delay-100 hover:scale-105 active:scale-90 gap-2 ${styles.addPostBtn}`}
                onClick={() => context.setOpenNewPost(true)}>
                <BiSolidMessageSquareAdd size={25}/>Post
            </div>

            <div
                className={`sm:hidden fixed top-20 right-0 transform  z-10 px-4 py-1 rounded-l-2xl text-white flex justify-center items-center transition delay-100 hover:scale-105 active:scale-90 gap-2 ${openUserCard ? `opacity-100`:'opacity-75'} ${styles.addPostBtn}`}
                onClick={() => {setOpenUserCard(!openUserCard)
                    setOpenLeaderBoard(false)
                }}>
                <GiCaptainHatProfile size={35}/>
            </div>
            <div
                className={`sm:hidden fixed top-32 right-0 transform  z-10 px-2 py-2 rounded-l-2xl text-white flex justify-center items-center transition delay-100 hover:scale-105 active:scale-90 gap-2 ${openLeaderBoard ? `opacity-100`:'opacity-75'} ${styles.showleader}`}
                onClick={() => {setOpenLeaderBoard(!openLeaderBoard)
                    setOpenUserCard(false)
            }}>
                <MdLeaderboard size={25} />
            </div>

            <div className={` top-0 w-[80%] h-auto rounded-3xl
                ${openLeaderBoard ? `fixed -right-5 top-44  sm:hidden bg-white bg-opacity-75 backdrop-blur-sm z-10 pt-5 p-10 ease-in duration-500 ` :
                `fixed right-[-100%]  p-10 ease-in duration-500`}`}>
                <motion.div className={`w-full flex flex-col gap-5 z-10`}
                            initial={{
                                x: 250,
                                opacity: 0
                            }}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 1}}>

                    <div className={`${styles.rightLeaderBoard} flex flex-col items-center`}>
                        <div className={`${styles.leaderBoardImg}`}>
                            <Image src={troffee} alt={'troffee Logo'} className={`w-24 h-24 -mt-20 `}/>

                        </div>
                        <h2 className={`text-lg font-semibold text-slate-500 ${styles.leaderBoaderHeading}`}>LeaderBoard</h2>
                        <motion.div className={`flex flex-col w-full gap-2 mt-5 `}
                                    variants={variants}
                                    initial="hidden"
                                    animate="show">
                            {context.allUser.sort((a, b) => b.coins - a.coins).slice(0, 6).map((item) => (
                                <motion.div variants={rightImages} key={item._id}>
                                    <LeaderCard key={item._id} {...item}/>
                                </motion.div>
                            ))}

                        </motion.div>
                    </div>


                </motion.div>

            </div>

            <div className={` top-0 w-[80%] h-full rounded-3xl
                ${openUserCard ? `fixed -right-5 top-44  sm:hidden bg-white bg-opacity-75 backdrop-blur-sm z-10 pt-5 p-10 ease-in duration-500 ` :
                `fixed right-[-100%]  p-10 ease-in duration-500`}`}>
                <motion.div className={`w-[75%] flex flex-col gap-5 fixed`}
                            variants={variants}
                            initial="hidden"
                            animate="show"
                >
                    <motion.div className={`${styles.leftPersonal} items-center flex flex-col`}
                                variants={images}
                    >
                        <div className={`${styles.posterImg} h-24 w-full`}>
                            <div
                                className={`${styles.level} px-3 font-semibold py-1 w-20 m-auto`}>{context.user?.designation}</div>

                        </div>
                        <motion.img
                            initial={{
                                y: 50,
                            }}
                            animate={{y: 0,}}
                            transition={{
                                type: "spring",
                                damping: 3,
                                stiffness: 50,
                                restDelta: 0.001
                            }}
                            src={context.user?.secure_url} alt={'Profile'}
                            className={`w-24 h-24 rounded-full -mt-10`}/>
                        <h2 className={`capitalize text-lg font-semibold text-slate-500`}>{context.user?.name}</h2>
                        <div className={`flex justify-center items-center gap-2`}><FaGraduationCap size={30}
                                                                                                   className={`text-slate-300 -rotate-45`}/>
                            <p
                                className={`text-slate-400 text-sm`}>Lovely Professional University</p>
                        </div>
                        <div className={`flex justify-center items-center mt-2`}>
                            <Image src={coins} alt={'coins'} className={`w-10`}/>
                            <h2 className={`text-lg text-slate-400 font-semibold`}>{context.user?.coins}</h2>
                        </div>

                        <div className={`w-full px-5 `}>
                            <h2 className={`text-center text-slate-500 mt-3 mb-2`}>Level {calculateLevelAndRange(context.user?.coins).level}</h2>
                            <BorderLinearProgress variant="determinate"
                                                  value={calculateLevelAndRange(context.user?.coins).range}/>

                        </div>

                    </motion.div>
                    <motion.div className={`${styles.leftRecentPost} px-4 py-2 flex flex-col items-center`}
                                variants={images}>
                        <h2 className={`text-slate-400 text-sm flex items-center gap-1`}>
                            <PiClockCounterClockwiseLight size={25}/>Recent <span
                            className={`text-pink-300`}>Posts</span></h2>
                        <div className={`flex flex-col justify-center items-center gap-2 mt-3 w-full `}>
                            {recentPosts.map((post) => (
                                <h2 key={post._id} onClick={() => {
                                    context.setPostDialogData(post);
                                    context.setOpenPostPage(true);
                                }}
                                    className={`text-slate-500 text-[14px] w-full pl-3 py-1 truncate hover:bg-slate-100 transition delay-100 hover:cursor-pointer drop-shadow-xl hover:scale-105`}>
                                    {post.post.split(' ').slice(0, 5).join(' ')}...
                                </h2>
                            ))}

                        </div>
                        <button
                            className={`${styles.showBtn} absolute bottom-0  bg-pink-300 text-white px-5 mt-2 flex justify-center items-center transition delay-100 active:scale-90`}

                        >Show
                            All Posts<FiArrowRight/></button>


                    </motion.div>

                </motion.div>
            </div>

            <PageWrapper>

                <div className={`flex  w-full px-5 md:px-32 pt-24 gap-10 `}>

                    <div className={`hidden sm:w-2/4 md:w-1/4 lg:1/4 sm:block`}>
                        <motion.div className={`sm:w-2/6 md:w-72 flex flex-col gap-5 fixed`}
                                    variants={variants}
                                    initial="hidden"
                                    animate="show"
                        >
                            <motion.div className={`${styles.leftPersonal} items-center flex flex-col`}
                                        variants={images}
                            >
                                <div className={`${styles.posterImg} h-24 w-full`}>
                                    <div
                                        className={`${styles.level} px-3 font-semibold py-1 w-20 m-auto`}>{context.user?.designation}</div>

                                </div>
                                <motion.img
                                    initial={{
                                        y: 50,
                                    }}
                                    animate={{y: 0,}}
                                    transition={{
                                        type: "spring",
                                        damping: 3,
                                        stiffness: 50,
                                        restDelta: 0.001
                                    }}
                                    src={context.user?.secure_url} alt={'Profile'}
                                    className={`w-24 h-24 rounded-full -mt-10`}/>
                                <h2 className={`capitalize text-lg font-semibold text-slate-500`}>{context.user?.name}</h2>
                                <div className={`flex justify-center items-center gap-2`}><FaGraduationCap size={30}
                                                                                                           className={`text-slate-300 -rotate-45`}/>
                                    <p
                                        className={`text-slate-400 text-sm`}>Lovely Professional University</p>
                                </div>
                                <div className={`flex justify-center items-center mt-2`}>
                                    <Image src={coins} alt={'coins'} className={`w-10`}/>
                                    <h2 className={`text-lg text-slate-400 font-semibold`}>{context.user?.coins}</h2>
                                </div>

                                <div className={`w-full px-5 `}>
                                    <h2 className={`text-center text-slate-500 mt-3 mb-2`}>Level {calculateLevelAndRange(context.user?.coins).level}</h2>
                                    <BorderLinearProgress variant="determinate"
                                                          value={calculateLevelAndRange(context.user?.coins).range}/>

                                </div>

                            </motion.div>
                            <motion.div className={`${styles.leftRecentPost} px-4 py-2 flex flex-col items-center`}
                                        variants={images}>
                                <h2 className={`text-slate-400 text-sm flex items-center gap-1`}>
                                    <PiClockCounterClockwiseLight size={25}/>Recent <span
                                    className={`text-pink-300`}>Posts</span></h2>
                                <div className={`flex flex-col justify-center items-center gap-2 mt-3 w-full `}>
                                    {recentPosts.map((post) => (
                                        <h2 key={post._id} onClick={() => {
                                            context.setPostDialogData(post);
                                            context.setOpenPostPage(true);
                                        }}
                                            className={`text-slate-500 text-[14px] w-full pl-3 py-1 truncate hover:bg-slate-100 transition delay-100 hover:cursor-pointer drop-shadow-xl hover:scale-105`}>
                                            {post.post.split(' ').slice(0, 5).join(' ')}...
                                        </h2>
                                    ))}

                                </div>
                                <button
                                    className={`${styles.showBtn} absolute bottom-0  bg-pink-300 text-white px-5 mt-2 flex justify-center items-center transition delay-100 active:scale-90`}

                                >Show
                                    All Posts<FiArrowRight/></button>


                            </motion.div>

                        </motion.div>

                    </div>
                    <motion.div className={`w-full md:w-2/4 flex flex-col gap-5 `}>
                        {context.openFilter && <div className={`w-full `}>
                            {context.showMyPost &&
                                <div className={`flex justify-between items-center border-b-2 pb-2 px-2 rounded-b-xl`}>

                                    <div className={`flex gap-2 text-slate-300`}><BsMailbox size={25}/><h2
                                        className={`text-xl text-slate-400`}>My Posts</h2></div>
                                    <div className={`flex gap-2 items-center`}><h2
                                        className={`text-sm rounded-full bg-slate-200 w-7 h-7 text-slate-400 flex flex-col justify-center items-center p-2`}>{allPost.length}</h2>
                                        <IoCloseOutline size={25}
                                                        className={`text-slate-300 border-2 rounded-lg transition delay-100 active:scale-90 hover:scale-110 hover:text-slate-500 hover:cursor-pointer`}
                                                        onClick={() => {
                                                            context.setShowMyPost(false);
                                                            context.setOpenFilter(false);
                                                        }}
                                        /></div>
                                </div>}
                            {context.showSavedPost &&
                                <div className={`flex justify-between items-center border-b-2 pb-2 px-2 rounded-b-xl`}>

                                    <div className={`flex gap-2 text-slate-300`}><BsMailbox size={25}/><h2
                                        className={`text-xl text-slate-400`}>Saved Posts</h2></div>
                                    <div className={`flex gap-2 items-center`}><h2
                                        className={`text-sm rounded-full bg-slate-200 w-7 h-7 text-slate-400 flex flex-col justify-center items-center p-2`}>{allPost.length}</h2>
                                        <IoCloseOutline size={25}
                                                        className={`text-slate-300 border-2 rounded-lg transition delay-100 active:scale-90 hover:scale-110 hover:text-slate-500 hover:cursor-pointer`}
                                                        onClick={() => {
                                                            context.setShowSavedPost(false);
                                                            context.setOpenFilter(false);
                                                        }}
                                        /></div>
                                </div>}
                        </div>}
                        {allPost.slice(0).reverse().map((item) => (
                            <div key={item._id}>
                                <PostCard key={item._id} data={item} {...item}/>
                            </div>
                        ))}

                    </motion.div>
                    <div className={`hidden md:w-1/4 md:block`}>
                        <motion.div className={`w-72 flex flex-col gap-5 fixed right-32 top-44 `}
                                    initial={{
                                        x: 250,
                                        opacity: 0
                                    }}
                                    animate={{x: 0, opacity: 1}}
                                    transition={{duration: 1}}>

                            <div className={`${styles.rightLeaderBoard} flex flex-col items-center`}>
                                <div className={`${styles.leaderBoardImg}`}>
                                    <Image src={troffee} alt={'troffee Logo'} className={`w-24 h-24 -mt-20 `}/>

                                </div>
                                <h2 className={`text-lg font-semibold text-slate-500 ${styles.leaderBoaderHeading}`}>LeaderBoard</h2>
                                <motion.div className={`flex flex-col w-full gap-2 mt-5 `}
                                            variants={variants}
                                            initial="hidden"
                                            animate="show">
                                    {context.allUser.sort((a, b) => b.coins - a.coins).slice(0, 6).map((item) => (
                                        <motion.div variants={rightImages} key={item._id}>
                                            <LeaderCard key={item._id} {...item}/>
                                        </motion.div>
                                    ))}

                                </motion.div>
                            </div>


                        </motion.div>
                    </div>

                </div>
            </PageWrapper>
            <AnimatePresence>
                {context.openProfile &&
                    (<motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div
                                className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                                onClick={() => {
                                    context.setOpenProfile(false)
                                }}

                            />
                            <motion.div
                                initial={{y: 50, opacity: 0, scale: 0}}
                                animate={{y: 0, opacity: 1, scale: 1}}
                                exit={{y: 50, opacity: 0, scale: 0}}
                                className="fixed transform">
                                <ViewProfile/>

                            </motion.div>


                        </motion.div>

                    )}

                {context.openNewPost &&
                    (<motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div
                                className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                                onClick={() => {
                                    context.setOpenNewPost(false);
                                    localStorage.removeItem(storageKey);
                                }}

                            />
                            <motion.div
                                initial={{y: 50, opacity: 0, scale: 0}}
                                animate={{y: 0, opacity: 1, scale: 1}}
                                exit={{y: 50, opacity: 0, scale: 0}}
                                className="fixed transform">
                                <NewPost/>

                            </motion.div>


                        </motion.div>

                    )}
                {context.openPostPage &&
                    (<motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div
                                className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                                onClick={() => {
                                    context.setOpenPostPage(false);

                                }}

                            />
                            <motion.div
                                initial={{y: 50, opacity: 0, scale: 0}}
                                animate={{y: 0, opacity: 1, scale: 1}}
                                exit={{y: 50, opacity: 0, scale: 0}}
                                className="fixed transform">
                                <ParticularPostPage/>

                            </motion.div>


                        </motion.div>

                    )}

                {context.openLikeDialog &&
                    (<motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div
                                className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                                onClick={() => {
                                    context.setOpenLikeDialog(false);

                                }}

                            />
                            <motion.div
                                initial={{y: 50, opacity: 0, scale: 0}}
                                animate={{y: 0, opacity: 1, scale: 1}}
                                exit={{y: 50, opacity: 0, scale: 0}}
                                className="fixed transform">
                                <LikeList/>

                            </motion.div>


                        </motion.div>

                    )}
            </AnimatePresence>


        </div>
    );
};

export default Dashboard;