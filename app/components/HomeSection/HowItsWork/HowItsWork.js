"use client";
import React, {useEffect} from 'react';
import styles from './howitswork.module.css';
import {IoCalendar} from "react-icons/io5";
import {FaLocationDot} from "react-icons/fa6";
import {GiSteeringWheel} from "react-icons/gi";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {TbMessage2Question} from "react-icons/tb";
import {FaUsers} from "react-icons/fa";
import {PiCompassToolBold} from "react-icons/pi";

const HowItsWorks = () => {

    const controls = useAnimation();
    const [refOneToOne,inViewOne]=useInView();
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
            x: 30,
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
    return (
        <div className={`my-16 w-full `}>
            <h3 className={`${styles.fontStyles} text-xs text-slate-400 text-center`}>HOW IT WORK</h3>
            <h2 className={`${styles.fontStyles} text-center md:text-xl font-semibold text-slate-600 mt-2`}>Unlock Answers in Three Simple Steps</h2>
            <motion.div
                variants={variants}
                initial="hidden"
                ref={refOneToOne}

                animate={controls}
                className={`flex flex-col md:flex-row justify-center items-center mt-10 gap-10 md:gap-1`}>
                <motion.div
                    variants={images}
                    className={` text-center`}>
                    <div className={`h-20 w-20 bg-white drop-shadow-2xl rounded-xl m-auto flex justify-center  items-center`}>
                        <TbMessage2Question size={40} color={"#FB5AA5"} className={`drop-shadow-lg`}/>
                    </div>
                    <h2 className={`${styles.fontStyles} mt-6 text-md font-semibold text-slate-600`}>
                       Post Your Questions
                    </h2>
                    <p className={`${styles.fontStyles} text-xs text-slate-400 mt-2`}>Submit your question for the <br/> community to view</p>
                </motion.div>
                <h1 className={`-mt-20 text-slate-400 font-bold text-center tracking-wide hidden md:block`}>-----------</h1>
                <motion.div
                    variants={images} className={` text-center`}>
                    <div className={`h-20 w-20  rounded-xl m-auto items-center flex justify-center ${styles.calBox}`}>
                        <FaUsers size={40} className={`text-white`} />

                    </div>
                    <h2 className={`${styles.fontStyles} mt-6 text-md font-semibold text-slate-600`}>
                        Share with the Community
                    </h2>
                    <p className={`${styles.fontStyles} text-xs text-slate-400 mt-2`}>Your question is now visible to <br/>all community members.</p>
                </motion.div>
                <h1 className={`-mt-20 text-slate-400 font-bold text-center tracking-wide hidden md:block`}>-----------</h1>
                <motion.div
                    variants={images} className={` text-center`}>
                    <div className={`h-20 w-20 bg-white drop-shadow-2xl rounded-xl m-auto flex justify-center items-center`}>
                        <PiCompassToolBold size={40} color={"#FB5AA5"} className={`drop-shadow-lg`} />
                    </div>
                    <h2 className={`${styles.fontStyles} mt-6 text-md font-semibold text-slate-600`}>
                        Get Answers
                    </h2>
                    <p className={`${styles.fontStyles} text-xs text-slate-400 mt-2`}>Browse responses and gain insights <br/>from multiple experts</p>
                </motion.div>

            </motion.div>

        </div>
    );
};

export default HowItsWorks;