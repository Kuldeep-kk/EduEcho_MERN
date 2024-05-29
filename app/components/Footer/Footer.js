import React from 'react';
import styles from './footer.module.css';
import {MdEmail} from "react-icons/md";
import {FaMapLocationDot, FaXTwitter} from "react-icons/fa6";
import {FaFacebookSquare, FaLinkedin, FaPhone} from "react-icons/fa";
import {PiInstagramLogoDuotone} from "react-icons/pi";
import logo from '@/public/mainLogo.png';
import Image from "next/image";

const Footer = () => {
    return (
        <div className={``}>
            <div
                className={`flex flex-col md:flex-row justify-center items-center pt-24 pb-10 md:px-40 gap-5 text-slate-200 ${styles.main}`}>

                <div className={`w-full  md:w-1/4 flex justify-center items-center`}>
                        <div>
                            <Image src={logo} alt={"logo"} className={`w-14 h-10`}/>
                        </div>
                        <div>
                            <h2 className={` font-semibold text-xl`}><span className={`text-3xl`}>E</span>du<span
                                className={`text-3xl`}>E</span>cho</h2>
                            <p>&copy; 2024. All rights reserved.</p>
                        </div>
                </div>
                <div className={`w-full md:w-2/4 flex flex-row justify-around px-5`}>
                <div className={`w-1/2 flex flex-col  `}>
                    <h2 className={`font-semibold`}>Navigation</h2>
                    <ul className={`text-sm pl-2 mt-3`}>
                        <li>Home</li>
                        <li>Dashboard</li>
                        <li>Contact Us</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className={`w-1/2`}>
                    <h2 className={`font-semibold`}>Contact</h2>
                    <ul className={`text-sm pl-2 mt-3 flex flex-col gap-2`}>
                        <li className={`flex items-center gap-2`}><MdEmail size={20}/> eduecho.lpu@gmail.com</li>
                        <li className={`flex items-center gap-2`}><FaPhone size={20} className={`rotate-90`}/> 7007834160</li>
                        <li className={`flex items-center gap-2`}> <FaMapLocationDot size={25}/>7P32+W3F, Chaheru Khusropur <br/>Link Rd, Punjab 144411</li>
                    </ul>
                </div>
                </div>

                <div className={`w-full md:w-1/4 flex justify-center items-center flex-col  ` }>
                    <h2 className={`font-semibold`}>Links</h2>
                    <ul className={`text-sm mt-3 flex gap-3`}>
                        <li><FaFacebookSquare size={25} /></li>
                        <li><PiInstagramLogoDuotone size={25} /></li>
                        <li><FaXTwitter size={25} /></li>
                        <li><FaLinkedin size={25} /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;