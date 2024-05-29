"use client";
import React, {useContext, useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/mainLogo.png";
import styles from "./navbar.module.css";
import {AnimatePresence, motion} from "framer-motion";
import UserContext from "@/app/context/userContext";
import {FaHome} from "react-icons/fa";
import {MdSpaceDashboard} from "react-icons/md";
import {SiFormstack, SiPayloadcms} from "react-icons/si";
import {BiSolidMessageSquareAdd} from "react-icons/bi";
import {usePathname, useRouter} from "next/navigation";
import {CgUserlane} from "react-icons/cg";
import {HiOutlineLogout} from "react-icons/hi";
import {logout} from "@/app/services/userService";
import {BsMailbox} from "react-icons/bs";
import {ImDownload} from "react-icons/im";
import {CiMenuFries} from "react-icons/ci";
import {RiMenu3Fill} from "react-icons/ri";
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter} from "react-icons/ai";
import {GrDropbox} from "react-icons/gr";
import {TbLogout2} from "react-icons/tb";



const Navbar = () => {

    const context=useContext(UserContext);
    const path = usePathname();
    const router = useRouter();

    const [user,setUser]=useState(context.user);
    const [openDropbox, setOpenDropBox]=useState(false);
    const [menuOpen,setMenuOpen]=useState(false);

    useEffect(()=>{

        setUser(context.user);
    },[context.user]);




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

    const doLogout =async () =>{
        try{
            const result=await logout();
            context.setUser(undefined);
            router.push('/Login');
            setOpenDropBox(false);
        }
        catch (e) {
            console.log(e);

        }
    }
    return (
        <div className={`${user ? 'block' : 'hidden'} fixed m-auto w-full py-3   ${styles.mainNav} `}>
            
            <div className={`flex flex-row justify-between items-center px-5 md:px-32 `}>
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{delay: 0.4}}
                    className={`flex justify-center items-center ${styles.mainLogoText} gap-2 text-slate-500`}>
                    <Image src={logo} alt={"logo"} className={`w-14 h-10`}/>
                    <h2> EduEcho</h2></motion.div>
                <div className={`hidden md:block`}>
                    <motion.ul
                        variants={variants}
                        initial="hidden"
                        animate="show"
                        className={`flex gap-20 text-slate-500`}>
                        <motion.li
                            variants={images}
                            className={`flex flex-col justify-center items-center`}
                        >
                            <Link href={"/Home"}
                                  className={`${path === '/Home' ? styles.activeBtn : ''} transition delay-100 hover:scale-105 active:scale-90 flex items-center gap-2`}><FaHome
                                size={25}/>Home</Link>
                        </motion.li>
                        <motion.li
                            variants={images}
                            className={`flex flex-col justify-center items-center`}
                        >
                            <Link href={"/Dashboard"}
                                  className={`${path === '/Dashboard' ? styles.activeBtn : ''} transition delay-100 hover:scale-105 active:scale-90 flex items-center gap-2`}><MdSpaceDashboard
                                size={25}/>Dashboard</Link>
                        </motion.li>
                        <motion.li
                            variants={images}
                            className={`flex flex-col justify-center items-center `}
                        >
                            <Link href={"/Contact"}
                                  className={`${path === '/Contact' ? styles.activeBtn : ''} transition delay-100 hover:scale-105 active:scale-90 flex items-center gap-2`}><SiFormstack
                                size={25}/>Contact Us</Link>
                        </motion.li>
                        {user &&
                            <motion.li
                                variants={images}
                                className={`flex flex-row gap-4 relative `}
                            >
                                {openDropbox && <>
                                    <motion.div
                                        initial={{y: -50, opacity: 0, scale: 0}}
                                        animate={{
                                            y: 0, opacity: 1, scale: 1,
                                            transition: {
                                                duration: 0.1
                                            },
                                        }}
                                        exit={{y: -50, opacity: 0, scale: 0}}

                                        className={`absolute top-16 left-1/2 bg-green-200 w-40 px-1 flex flex-col gap-3  ${styles.dropbox}`}>
                                        <h2 className={`text-center font-semibold mt-2 text-slate-400 capitalize`}>{user.name}</h2>
                                        <hr/>
                                        <button
                                            className={`w-full p-1 flex items-center justify-center gap-2 ${styles.viewBtn}`}
                                            onClick={() => {
                                                context.setOpenProfile(true);
                                                setOpenDropBox(false);

                                            }}><CgUserlane size={25}/>View Profile
                                        </button>

                                        <button
                                            className={`w-full p-1 flex items-center justify-center gap-2 ${styles.viewBtn}`}
                                            onClick={() => {
                                                context.setOpenFilter(true);
                                                context.setShowMyPost(true);
                                                context.setShowSavedPost(false);
                                                setOpenDropBox(false);
                                            }}><BsMailbox size={25}/>My Posts
                                        </button>

                                        <button
                                            className={`w-full p-1 flex items-center justify-center gap-2 ${styles.viewBtn}`}
                                            onClick={() => {
                                                context.setOpenFilter(true);
                                                context.setShowSavedPost(true);
                                                context.setShowMyPost(false);
                                                setOpenDropBox(false);
                                            }}><ImDownload size={25}/>Saved Posts
                                        </button>

                                        <button
                                            className={` w-full p-1 flex items-center justify-center gap-2 ${styles.logoutBtn} ${styles.dropItems}`}
                                            onClick={doLogout}><HiOutlineLogout size={25}/>Logout
                                        </button>


                                    </motion.div>
                                </>}
                                <button
                                    className={`${styles.blogBtn} rounded-full px-8 text-white flex justify-center items-center transition delay-100 hover:scale-105 active:scale-90 gap-2`}
                                    onClick={() => context.setOpenNewPost(true)}><BiSolidMessageSquareAdd
                                    size={25}/>Post
                                </button>
                                <img onClick={() => setOpenDropBox(!openDropbox)} src={user?.secure_url}
                                     alt={"user profile"}
                                     className={`w-12 rounded-full p-1 hover:cursor-pointer transition delay-50 active:scale-90 ${styles.myProfile}`}/>
                            </motion.li>
                        }

                    </motion.ul>
                </div>
                <div className={`block sm:hidden`}>
                    <RiMenu3Fill size={25} className={`text-slate-400 `} onClick={() => setMenuOpen(!menuOpen)}/>
                </div>


            </div>


            <div className={` top-0 w-[65%] h-screen
                ${menuOpen ? `fixed -left-5  sm:hidden  bg-[#ecf0f3] opacity-95 pt-5 p-10 ease-in duration-500 ${styles.sizeNav}` :
                `fixed left-[-100%]  p-10 ease-in duration-500 ${styles.sizeNav}`} `}>

                <img className={`rounded-full m-auto shadow shadow-gray-400 shadow-xl`} src={user?.secure_url}
                     alt={"pic"} width="100px"/>
                <h2 className={`text-center font-semibold text-slate-500 mt-4 capitalize`}>{user?.name}</h2>


                <div className={`flex-col pt-10 pb-5 `}>
                    <ul>

                        <li className="py-4 cursor-pointer hover:border-b text-lg  text-gray-400">

                            <motion.div whileHover={{scale: 1.1}} className={`flex items-center`}>
                                <div className={`mr-2 ${path === '/Home' ? styles.activeBtn : ''}`}
                                     style={{fontSize: '30px'}}>
                                    <FaHome
                                        size={25}/>
                                </div>
                                <Link
                                    className={`${path === '/Home' ? styles.activeBtn : ''} font-semibold `}
                                    href={"/Home"}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </motion.div>
                        </li>

                        <li className="py-4 cursor-pointer hover:border-b text-lg  text-gray-400">

                            <motion.div whileHover={{scale: 1.1}} className={`flex items-center`}>
                                <div className={`mr-2 ${path === '/Dashboard' ? styles.activeBtn : ''}`}
                                     style={{fontSize: '30px'}}><MdSpaceDashboard size={25}/></div>
                                <Link
                                    className={`${path === '/Dashboard' ? styles.activeBtn : ''} font-semibold `}
                                    href={"/Dashboard"}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </motion.div>
                        </li>

                        <li className="py-4 cursor-pointer hover:border-b text-lg  text-gray-400">

                            <motion.div whileHover={{scale: 1.1}} className={`flex items-center`}>
                                <div className={`mr-2 ${path === '/Contact' ? styles.activeBtn : ''}`}
                                     style={{fontSize: '30px'}}><SiFormstack size={25}/></div>
                                <Link
                                    className={`${path === '/Contact' ? styles.activeBtn : ''} font-semibold `}
                                    href={"/Contact"}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Contact Us
                                </Link>
                            </motion.div>
                        </li>


                    </ul>
                </div>
                <div className={`absolute bottom-16 w-[100%] left-0 px-5 `}>

                    <div className={`grid grid-cols-2 gap-1`}>
                        <div className={`col-span-1 flex mb-1 items-center ${styles.buttonSideNav} active:scale-75`}
                             onClick={() => {
                                 context.setOpenProfile(true);
                                 setOpenDropBox(false);
                                 setMenuOpen(false);

                             }}><CgUserlane size={20} className={`mr-0.5`}/>Profile
                        </div>
                        <div className={`col-span-1 flex mb-1  items-center ${styles.buttonSideNav} active:scale-75`}
                             onClick={() => {
                                 context.setOpenFilter(true);
                                 context.setShowMyPost(true);
                                 context.setShowSavedPost(false);
                                 setOpenDropBox(false);
                                 setMenuOpen(false);
                                 if (path !== '/Dashboard') {
                                     router.push('/Dashboard');
                                 }
                             }}><BsMailbox size={25}/>My Posts
                        </div>
                    </div>
                    <div className={`flex  mb-1 ${styles.buttonSideNav} active:scale-75`} onClick={() => {
                        context.setOpenFilter(true);
                        context.setShowSavedPost(true);
                        context.setShowMyPost(false);
                        setOpenDropBox(false);
                        setMenuOpen(false);
                        if (path !== '/Dashboard') {
                            router.push('/Dashboard');
                        }

                    }}>
                        <ImDownload size={20} className={`mr-2 ml-6`}/>Saved Posts
                    </div>


                    <div className="flex flex-row justify-around pt-10 items-center">

                        <AiOutlineInstagram size={30} className="cursor-pointer"/>
                        <AiOutlineFacebook size={30} className="cursor-pointer"/>
                        <AiOutlineTwitter size={30} className="cursor-pointer"/>
                    </div>
                    <div className={`flex flex-col justify-center items-center`}>
                        <Link href='/Home' className={``}>
                            <Image src={logo} alt={"logo"} width="120" height="75" className="cursor-pointer pt-6 pl-4 "
                                   priority/>
                        </Link>

                    </div>

                    <div className={`flex items-center ${styles.logoutBtnSideNav} mt-2 active:scale-75`}
                         onClick={() => {
                             setMenuOpen(false);
                             doLogout()
                         }}><TbLogout2 size={25} className={`ml-9 mr-2  text-white`}/><h2
                        className={`text-xl  text-white`}>Logout</h2></div>
                </div>

            </div>

        </div>
    );
};

export default Navbar;