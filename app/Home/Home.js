"use client";
import React, {useContext} from 'react';
import UserContext from "@/app/context/userContext";
import PageWrapper from "@/app/PageWrapper";
import HeroSection from "@/app/components/HomeSection/HeroSection/HeroSection";
import Navbar from "@/app/components/Navbar/Navbar";
import {AnimatePresence, motion} from "framer-motion";
import ViewProfile from "@/app/components/ViewProfile/ViewProfile";
import HowItsWorks from "@/app/components/HomeSection/HowItsWork/HowItsWork";
import OvercomeChallenges from "@/app/components/HomeSection/OvercomeChallenges/OvercomeChallenges";
import Testimonial from "@/app/components/HomeSection/Testimonial/Testimonial";
import Footer from "@/app/components/Footer/Footer";
import styles from "./home.module.css";
import NewPost from "@/app/components/NewPost/NewPost";
import AddPostImage from "@/app/components/AddPostImage";

const Home = () => {

    const context=useContext(UserContext);
    const storageKey = 'uploadedImages';
    return (
        <div>
            <PageWrapper>
                <HeroSection/>
                <HowItsWorks/>
                <OvercomeChallenges/>
                <Testimonial/>

                <div className={`mt-20 relative`}>
                    <div
                        className={`w-[85%] md:w-1/2 h-32 bg-green-200 mt-5 absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-full z-10 flex ${styles.subFooter}`}>
                        <img src={'https://res.cloudinary.com/dzxorfube/image/upload/v1710731405/alnd4kou9monlgq40zu4.png'} alt={"cap"} className={`-mt-10 -ml-10 w-32 h-24`} />


                        <div className={`md:w-1/2 text-white  flex flex-col justify-center items-center`}>
                            <h2 className={`font-bold text-xl md:text-2xl w-full`}>Start learning now</h2>
                            <p className={`text-sm w-full`}>Platform for forward-thinking organisations.</p>
                        </div>
                        <div className={`md:w-1/2 flex justify-center items-center mr-5`}>
                            <button className={`bg-white px-4 py-2 ${styles.startBtn}`}>
                                Start Now
                            </button>

                        </div>

                    </div>

                    <Footer/>
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
                </AnimatePresence>
        </div>
    );
};

export default Home;