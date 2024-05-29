"use client";
import React, {useEffect} from 'react';
import styles from "./review.module.css";
import {useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";

const ReviewCard = ({cardData}) => {
    const controls = useAnimation();
    const [refOneToOne,inViewOne]=useInView();
    useEffect(() => {
        if (inViewOne) {
            controls.start("show");
        }
    }, [controls, inViewOne]);

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

    return (
        < motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            ref={refOneToOne}

            className={`flex flex-col md:flex-row ${styles.fontStyles}`}>
            <motion.img variants={images} src={cardData.imageSrc} alt={cardData.name} className={`w-full h-40 md:w-36 md:w-36  rounded-2xl`}/>
            <motion.div variants={images} className={`p-3`}>
                <h2 className={`text-slate-600`}>{cardData.name}</h2>
                <p className={`text-slate-400 text-xs font-light mt-2`}>{cardData.desc}</p>
                {cardData.stars===5 && <p>⭐⭐⭐⭐⭐</p>}
                {cardData.stars===4 && <p>⭐⭐⭐⭐</p>}
                {cardData.stars===3 && <p>⭐⭐⭐</p>}
                {cardData.stars===2 && <p>⭐⭐</p>}
                {cardData.stars===1 && <p>⭐</p>}
            </motion.div>


        </motion.div>
    );
};

export default ReviewCard;