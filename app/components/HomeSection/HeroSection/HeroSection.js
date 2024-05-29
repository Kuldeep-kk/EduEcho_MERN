import React from 'react';
import heroImage from '@/public/AuthLayoutsImages/heroImage.png';
import Image from "next/image";
import styles from "./herosection.module.css";
import goldenLead from "@/public/AuthLayoutsImages/goldenLeaf.png";
import {DiUnitySmall} from "react-icons/di";
import {AnimatePresence, motion} from "framer-motion";
const HeroSection = () => {
    return (
        <div className={`flex flex-col md:flex-row pt-2 md:pt-20 ${styles.main}`}>
            <div className={`w-full md:w-1/2 flex flex-col items-end`}>
                <div className={`w-[95%] md:w-[80%] mt-20 relative`}>
                    <h5 className={` text-white text-xs py-2 w-40 md:w-56 text-center ${styles.heroSub} rounded-full`}>Intuitive Problem Solution</h5>
                    <h1 className={`${styles.heroMain}`}>Best Solution And Grow<br/>Your <span className={`${styles.futurestyles}`}>Future</span> Easier <br/>Than Ever</h1>
                    <Image src={goldenLead} alt={"gleaf"} className={`absolute top-5 right-14 md:right-10 w-7 md:w-10 -rotate-45`}/>
                    <p className={`text-xs md:text-sm text-slate-400 `}>We blend insights and stategy to create digital platform for <br/>forward-thinking organisations.</p>

                    <button className={`${styles.exploreBtn} mt-5 md:mt-10 md:h-10 px-5 md:px-10 text-white flex justify-center items-center transition delay-100 hover:scale-105 active:scale-90`}><DiUnitySmall size={30}/>Explore</button>
                </div>
            </div>
            <motion.div
                initial={{ y: 50, opacity: 0,scale:0 }}
                animate={{ y: 0, opacity: 1,scale:1 }}
                exit={{ y: 50, opacity: 0,scale:0 }}
                transition={{ delay: 0.4 }} className={`w-full md:w-1/2 flex flex-col justify-center items-center md:justify-end md:items-end relative`}>
                <Image src={heroImage} alt={`Hero Section`} className={`w-[75%] md:w-[80%]`}  />
                <div className={`absolute top-10 left-10 md:left-40 w-36 md:w-60 h-16 md:h-24 ${styles.floatingBox}`}>


                </div>
            </motion.div>

            
        </div>
    );
};

export default HeroSection;