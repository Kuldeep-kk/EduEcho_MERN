import React from 'react';
import coin from "@/public/coins.png";
import Image from "next/image";
import styles from './leaderCard.module.css';
const LeaderCard = ({name,secure_url,coins,designation}) => {
    return (

            <div className={`flex justify-between items-center mx-2 px-2 py-2 ${styles.main}`}>
                <div className={`flex gap-2`}>
                <img src={secure_url} className={`w-10 rounded-full`} />
                <div className={`flex flex-col`}>
                    <h2 className={`capitalize text-slate-500 text-[15px]`}>{name}</h2>
                    <div className={`text-white text-sm px-2 w-16 ${designation === 'Master' ? `${styles.masterStyle} ` : `${styles.studentStyle}`}`}>{designation}</div>
                </div>
                </div>
                <div className={`flex`}>
                    <Image src={coin} alt={'coins'} className={`w-7`}/>
                    <h2 className={`text-slate-500`}>{coins}</h2>

                </div>


            </div>

    );
};

export default LeaderCard;