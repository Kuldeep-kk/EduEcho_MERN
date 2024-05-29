"use client";
import React from 'react';
import styles from "./authlayout.module.css";
import PageWrapper from "@/app/PageWrapper";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import layoutImage from "@/public/AuthLayoutsImages/layoutImage.png";



const AuthLayout = ({children}) => {
    return (
        <PageWrapper>

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }} className={`flex justify-center items-center h-[100vh] w-[100%] ${styles.mainLayout}`}>

                    <motion.div
                        initial={{ y: 50, opacity: 0,scale:0 }}
                        animate={{ y: 0, opacity: 1,scale:1 }}
                        exit={{ y: 50, opacity: 0,scale:0 }}
                        transition={{ delay: 0.4 }}
                        className={`w-[90%] md:w-[60%] h-[60%] bg-white flex flex-col md:flex-row ${styles.layoutBox}`}>
                        <div className={`w-0 md:w-1/2  `}><Image src={layoutImage} alt={"layoutImage"} className={`w-full h-full rounded-xl`}/></div>
                        <div className={`w-full md:w-1/2 p-4 `}>{children}</div>
                    </motion.div>

                </motion.div>
            </AnimatePresence>
        </PageWrapper>


    );
};

export default AuthLayout;