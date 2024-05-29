"use client";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './testimonial.module.css';
import {BiSolidQuoteSingleLeft} from "react-icons/bi";


import reviewList from "./reviewList.json";
import ReviewCard from "@/app/components/HomeSection/Testimonial/ReviewCard/ReviewCard";

const Testimonial = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className={`${styles.main} mt-10 flex justify-center py-10 flex-col gap-20`}>
            <div className={`text-center`}>
                <h2 className={`text-slate-500 text-2xl font-semibold`}>What Peoples Are Saying About EduEcho</h2>
                <p className={`text-slate-400`}>Success stories from our customers</p>

            </div>
            <div className={`h-96 md:h-64 w-[90%] md:w-[50%] bg-white m-auto relative ${styles.msgBox}`}>
                <div className={`absolute -top-10 left-5 flex `}>
                    <BiSolidQuoteSingleLeft size={70} color={"#fa93c3"} className={`drop-shadow-lg `} />
                    <BiSolidQuoteSingleLeft size={70} color={"#fa93c3"} className={`drop-shadow-lg -ml-7`} /></div>
                <div className={`mt-7 md:mt-14 px-16 `}>
                    <Slider {...settings}>
                        {reviewList.peoples.map((cardData, i) => (
                            <ReviewCard cardData={cardData} key={i}/>
                        ))}
                    </Slider>
                </div>
            </div>


        </div>
    );
};

export default Testimonial;