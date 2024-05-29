'use client';
import React, {useState} from 'react';
import styles from './contact.module.css';
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";
import {Dropdown} from "primereact/dropdown";
import {BsFillSendFill, BsMailbox} from "react-icons/bs";
import {BiPhoneCall, BiSolidPhoneCall} from "react-icons/bi";
import PageWrapper from "@/app/PageWrapper";
import Footer from "@/app/components/Footer/Footer";

const Page = () => {

    const [userData, setUserData] = useState({

        name:"",email: "", phone: "", findUs:""
    });
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'LinkedIn', code: 'NY' },
        { name: 'Through Internet', code: 'RM' },
        { name: 'Friends', code: 'LDN' },
    ];

    return (
        <PageWrapper>
        <div className="flex justify-center items-center w-full h-[100vh]">
            <div className={`mt-10 md:mt-0 z-10 w-[95%] md:w-[65%] md:h-[75vh] relative  flex  ${styles.mainBox}`}>
                <div className={`w-full md:w-3/4 ${styles.leftBox} md:p-10 p-5`}>

                    <div className={`md:ml-10 w-full md:w-[70%]`}>
                        <h2 className={`text-4xl font-bold text-slate-500 gap-2 md:flex `}>Get in <h2
                            className={`${styles.heroText}`}>Touch</h2></h2>
                        <p className={`text-xs text-slate-500 mt-5`}>We’re here for you. Contact us with any questions,
                            concerns, or feedback. Your satisfaction is our priority.</p>

                        <div className={`mt-5 flex flex-col gap-5`}>
                            {/* Name Field */}
                            <div className={`p-inputgroup flex-1 md:w-88 ${styles.inputGroup}`}>
                <span className={`p-inputgroup-addon ${styles.inputSymbol}`}>
                    <i className="pi pi-user"></i>
                </span>
                                <span className="p-float-label">
                    <InputText
                        id="name"
                        value={userData.name}
                        className={`h-10 text-sm text-slate-500 pl-3 ${styles.inputOverride}`}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                    />
                    <label htmlFor="name">Name</label>
                </span>
                            </div>

                            {/* Email Field */}
                            <div className={`p-inputgroup flex-1 md:w-88 ${styles.inputGroup}`}>
                <span className={`p-inputgroup-addon ${styles.inputSymbol}`}>
                    <i className="pi pi-envelope"></i>
                </span>
                                <span className="p-float-label">
                    <InputText
                        id="email"
                        value={userData.email}
                        type="email"
                        className={`h-10 text-sm text-slate-500 pl-3 ${styles.inputOverride}`}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                    <label htmlFor="email">Email</label>
                </span>
                            </div>

                            {/* Phone Number Field */}
                            <div className={`p-inputgroup flex-1 md:w-88 ${styles.inputGroup}`}>
                <span className={`p-inputgroup-addon ${styles.inputSymbol}`}>
                    <i className="pi pi-phone"></i>
                </span>
                                <span className="p-float-label">
                    <InputText
                        id="phone"
                        value={userData.phone}
                        type="tel"
                        className={`h-10 text-sm text-slate-500 pl-3 ${styles.inputOverride}`}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    />
                    <label htmlFor="phone">Phone Number</label>
                </span>
                            </div>
                            <div className={`p-inputgroup flex-1 md:w-88 ${styles.inputGroup}`}>
                                <FloatLabel className="">
                                    <Dropdown inputId="dd-city" value={userData.findUs}
                                              options={cities}
                                              onChange={(e) => setUserData({...userData, findUs: e.value})}
                                              optionLabel="name" className="w-full"/>
                                    <label htmlFor="dd-city">How did you find us?</label>
                                </FloatLabel>
                            </div>

                            <div className={`flex justify-center gap-4 items-center text-white ${styles.sendBut}  p-2`} onClick={()=>console.log(userData)}>
                                <h2>Send</h2>
                                <BsFillSendFill/>
                            </div>

                            <div className={`flex gap-5 md:gap-10 flex-col md:flex-row  items-start`}>
                                <div className={`flex justify-center items-center  gap-2`}>
                                    <div>
                                        <BiPhoneCall size={35} />

                                    </div>
                                    <div className={`flex flex-col`}>
                                        <h2 className={` text-sm`}>PHONE</h2>
                                        <h3 className={`text-sm ${styles.heroText}`}>7007834160</h3>
                                    </div>

                                </div>
                                <div className={`flex justify-center items-center gap-2`}>
                                    <div>
                                        <BsMailbox size={35}/>

                                    </div>
                                    <div className={`flex flex-col`}>
                                        <h2 className={` text-sm`}>EMAIL</h2>
                                        <h3 className={`text-sm ${styles.heroText}`}>eduecho.lpu@gmail.com</h3>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div className={`absolute right-24 top-24 rounded-xl`}

                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54542.30053160493!2d75.59577594969275!3d31.30668071813809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f5e9c489cf3%3A0x4049a5409d53c300!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1716559359553!5m2!1sen!2sin"
                            width="280"
                            height="380"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className={`rounded-xl hidden md:block `}
                        ></iframe>
                    </div>
                </div>
                <div className={`w-1/5 md:w-1/4 ${styles.contactRightBox}`}></div>
            </div>


        </div>
            <Footer/>
        </PageWrapper>
    );
};

export default Page;
