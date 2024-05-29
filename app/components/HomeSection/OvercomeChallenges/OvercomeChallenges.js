"use client";
import React, {useEffect} from 'react';
import styles from './overcomechallenges.module.css';
import {motion, useAnimation} from "framer-motion";
import chairTable from '@/public/HomePage/chairWithTable.png';
import {useInView} from "react-intersection-observer";
import Image from "next/image";
import {TbMessage2Question} from "react-icons/tb";
import {FaAccusoft, FaUsers} from "react-icons/fa";
import {PiCompassToolBold, PiGraphFill} from "react-icons/pi";
import {MdRocketLaunch} from "react-icons/md";
const OvercomeChallenges = () => {
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
    const images1 = {
        hidden: {
            opacity: 0,
            x: -50,
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
        <div className={`w-full flex gap-10 flex-col justify-center md:py-5 pb-14 ${styles.mainBox}`}>
            <div className={`text-center mt-10`}>
                <h2 className={`text-slate-500 text-xl md:text-2xl font-semibold  px-6`}>
                    Advance Your Journey to Overcome Challenges and Unlock Potential
                </h2>
                <p className={`text-slate-400 px-16 text-sm md:text-md`}>Here are just a few types of technologists that we help</p>
            </div>
            <div className={`flex flex-col md:flex-row  md:px-20 `}>
                <div className={`w-full md:w-1/2 `}>
                    <motion.img
                        src={chairTable.src}
                        alt="learn"
                        className={``}
                        initial="hidden"
                        animate={controls}
                        variants={images1}

                    />
                </div>

                <div className={`w-full md:w-1/2 md:pl-20 `}>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        ref={refOneToOne}

                        animate={controls}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-4 px-10 md:px-0`}>
                        <motion.div
                            variants={images}
                            className={`card py-5 shadow rounded-lg px-10 ${styles.cardGrp1} text-center col-span-2 md:col-span-1 `}>
                            <div
                                className={`h-20 w-20  m-auto flex justify-center  items-center`}>
                                <MdRocketLaunch size={50} color={"#FB5AA5"} className={`drop-shadow-lg`}/>
                            </div>
                            <h2 className={`${styles.fontStyles} mt-4 text-md font-semibold text-slate-600`}>
                                DevOps engineers
                            </h2>
                            <p className={`${styles.fontStyles} text-xs text-slate-400 mt-2`}>Optimize workflows, enhance collaboration, and ensure seamless deployment.</p>
                        </motion.div>
                        <motion.div
                            variants={images} className={`card bg-white p-6 shadow rounded-lg row-span-2 md:mt-24 h-56 ${styles.cardGrp2} text-center  md:px-10`}>
                            <div
                                className={`h-20 w-20  rounded-xl m-auto items-center flex justify-center ${styles.calBox}`}>
                                <FaAccusoft size={55} className={`text-white`}/>

                            </div>
                            <h2 className={`${styles.fontStyles} mt-4 text-md font-semibold text-white`}>
                               Software engineers
                            </h2>
                            <p className={`${styles.fontStyles} text-xs text-slate-200 mt-2`}>Build innovative software, solve complex challenges, and shape the digital world.</p>
                        </motion.div>
                        <motion.div
                            variants={images} className={`card bg-white p-6 shadow rounded-lg col-span-2 md:col-span-1 ${styles.cardGrp1} text-center px-10`}>
                            <div
                                className={`h-20 w-20 m-auto flex justify-center items-center`}>
                                <PiGraphFill size={50} color={"#FB5AA5"} className={``}/>
                            </div>
                            <h2 className={`${styles.fontStyles} mt-4 text-md font-semibold text-slate-600`}>
                                Data scientists
                            </h2>
                            <p className={`${styles.fontStyles} text-xs text-slate-400 mt-2`}>Transform data into insights, drive innovation, and inform decisions.</p>
                        </motion.div>

                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default OvercomeChallenges;