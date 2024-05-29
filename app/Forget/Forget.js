"use client";
import React, { useState, useRef } from 'react';
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import { mailer } from "@/app/mailServices/mailService";
import { PulseLoader, ScaleLoader, SyncLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowBendUpLeft } from "react-icons/pi";
import styles from "./forget.module.css";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import forgetPic from "@/public/AuthLayoutsImages/forget.png";
import Swal from "sweetalert2";
import {changePassword, checkEmail} from "@/app/services/userService";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Forget = () => {
    const [stage, setStage] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const genderOption = ['Male', 'Female'];
    const [buttonClicked, setButtonClicked] = useState(false);
    const inputsRef = useRef([]);
    const [verifiedMail, setVerifiedMail] = useState(false);
    const [sendingStatus, setSendingStatus] = useState(false);
    const router =useRouter();


    const [resetLoading,setResetLoading]=useState(false);
    const [mailOtp, setMailOtp] = useState({
        to: "",
        subject: "OTP",
        text: "",
    });


    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const checkPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const resetPass=async ()=>{

        if(checkPassword(user.password)){

            try{

                setResetLoading(true);
                const result=await changePassword(user);
                setResetLoading(false);
                Toast.fire({
                    icon: "success",
                    title: "Password reset success"
                });

                router.push('/Login');


            }
            catch (e) {

                Toast.fire({
                    icon: "error",
                    title: "Failed To Reset Password"
                });

            }


        }
        else{
            Toast.fire({
                icon: "warning",
                title: "Please fulfill password criteria"
            });

        }

    }

    const verifyOtpFn = () => {
        const enteredOtp = otp.join('');
        if (mailOtp.text === enteredOtp) {
            setVerifiedMail(true);


            setStage(3);
            Toast.fire({
                icon: "success",
                title: "Email Verified"
            });

        } else {
            Toast.fire({
                icon: "error",
                title: "Wrong OTP!!!"
            });
            setOtp(new Array(4).fill(''));
        }
    };

    const sendOtp = async () => {
        Toast.fire({
            icon: "info",
            title: "OTP Sending"
        });
        setSendingStatus(true);
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        const newMailOtp = {
            ...mailOtp,
            to: email,
            text: generatedOtp,
        };
        setMailOtp(newMailOtp);


        const result = await mailer(newMailOtp);

        if (result == email && stage == 1) {
            setStage(2);
            setButtonClicked(false);
            setUser({
                ...user,
                email: email
            })


        }
        Toast.fire({
            icon: "success",
            title: "OTP Sent"
        });
        setSendingStatus(false);
    };

    const handleChange = (element, index) => {
        const value = element.value;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const isEmailValid = () => {
        const regex = /^[a-zA-Z]+\.([0-9]+)@lpu\.in$/;
        return regex.test(email);
    };

    const handleGetOtpClick = () => {
        setButtonClicked(true);
        if (isEmailValid()) {
            checkMailExist();
        }
    };

    const checkMailExist = async () => {

        Toast.fire({
            icon: "warning",
            title: "Checking your email "
        });

        const result = await checkEmail(email);
        if (result.success) {
            console.log("User not register")
            Toast.fire({
                icon: "error",
                title: "Email not registered yet"
            });

        } else {
            sendOtp();
        }
    };

    const handlePreviousStage = () => {
        if (stage > 1) {
            if (stage > 2) {
                setEmail('');
                setOtp(new Array(4).fill(''));
                setStage(1);
            } else {
                setStage(stage - 1);
            }
        }
    };


    return (
        <AuthLayout>
            <AnimatePresence>
                <div className={`relative h-full w-full`}>
                    <div className={`flex flex-col items-center  w-full   relative `}>
                        <div className={`md:p-5 flex flex-col items-center `}>
                            <h2 className={`text-2xl text-center font-bold text-slate-500 `}>
                                Forgot Password
                            </h2>
                            <div className={`border-2 w-20 border-pink-300 mb-3`}></div>
                            <p className={`text-xs text-center text-slate-400 px-6`}>Can't remember your password? No problem. We're here to help you reset and reconnect.</p>
                        </div>
                        <Image src={forgetPic} alt={"forget page"} className={`${stage ===2? `w-36`:`w-44`}`}/>


                        <motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className={`flex flex-col  text-md w-full justify-center items-center ${sendingStatus ? 'gap-4' : 'gap-2'}`}>

                            <motion.div
                                initial={{y: 50, opacity: 0, scale: 0}}
                                animate={{y: 0, opacity: 1, scale: 1}}
                                exit={{y: 50, opacity: 0, scale: 0}}
                                transition={{delay: 0.4}}
                                className={`flex flex-col items-center w-full  ${stage === 2? 'gap-1.5 ' : 'gap-4'}`}>
                                <input
                                    type="email"
                                    placeholder="Enter your LPU email..."
                                    className={`text-center p-2 text-sm text-gray-600 w-64 rounded-xl drop-shadow-2xl focus:outline-0 ${buttonClicked ? !isEmailValid() ? 'shadow-lg shadow-red-300/50 ' : 'focus:outline-0 shadow-lg shadow-green-300/50' : ``}  ${stage > 1 ? 'mt-1' : 'mt-5'}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={stage > 1}
                                />


                                {stage === 1 && (
                                    <>
                                        {buttonClicked && !isEmailValid() && (
                                            <div className="text-red-500 text-xs">
                                                *Enter your lpu email correctly!!!
                                            </div>
                                        )}
                                        {!sendingStatus && (
                                            <button
                                                className={`m-auto bg-green-400 text-white px-3 py-2 active:scale-90 transition delay-100 rounded drop-shadow-2xl text-sm`}
                                                onClick={handleGetOtpClick}
                                            >
                                                Get OTP
                                            </button>
                                        )}
                                    </>
                                )}
                            </motion.div>
                            {stage === 2 && (
                                <>{!sendingStatus &&
                                    <motion.div
                                        initial={{y: 50, opacity: 0, scale: 0}}
                                        animate={{y: 0, opacity: 1, scale: 1}}
                                        exit={{y: 50, opacity: 0, scale: 0}}
                                        transition={{delay: 0.4}}
                                        className={`flex flex-col justify-center items-center`}>
                                        <div className={`flex w-auto gap-3 justify-between`}>
                                            {otp.map((data, index) => (
                                                <input
                                                    className={`text-center w-10 h-10 active:scale-105`}
                                                    key={index}
                                                    ref={(ref) => (inputsRef.current[index] = ref)}
                                                    type="text"
                                                    maxLength={1}
                                                    value={data}
                                                    onChange={(e) => handleChange(e.target, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    aria-label={`OTP digit ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            className={`mt-2  bg-orange-500 text-white px-4 py-2 active:scale-90 transition delay-100 rounded drop-shadow-2xl text-sm`}
                                            onClick={verifyOtpFn}
                                        >
                                            Verify
                                        </button>
                                        <div className={`text-sm text-slate-400`}>Dont receive the OTP ? <button
                                            onClick={sendOtp}
                                            className={`text-pink-400 active:scale-90 transition delay-100 `}>RESEND
                                            OTP</button></div>
                                    </motion.div>}


                                </>
                            )}
                            {stage === 3 && (
                                <div className={`flex flex-col gap-5 justify center items-center`}>

                                    <div className={`flex gap-3`}>
                                        <div className="card flex justify-content-center">
                                        <span className="p-float-label">
                                            <Password inputId="password" value={user.password}
                                                      onChange={(e) => setUser({
                                                          ...user,
                                                          password: e.target.value
                                                      })}
                                                      promptLabel="Choose a password" weakLabel="Too simple"
                                                      mediumLabel="Average complexity" strongLabel="Complex password"
                                                      toggleMask
                                                      className={`h-10`}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </span>
                                        </div>
                                        <button
                                            className={`bg-pink-400 text-white px-3 rounded text-md h-10 w-20 active:scale-90 transition delay-100 }`}
                                            style={{boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.2)"}}
                                            onClick={resetPass}>{resetLoading ?
                                            <PulseLoader color="#F4F4F4" size={10}
                                                         className={``}/> : <>Reset</>}</button>
                                    </div>
                                </div>

                            )}

                            {sendingStatus && <SyncLoader color="#F3B0DF"/>}
                            <div className={` absolute top-24 left-10`}>
                                {stage > 1 && (
                                    <PiArrowBendUpLeft onClick={handlePreviousStage} size={30}
                                                       className={`${styles.backButton} text-orange-700 rounded-full  active:scale-90 transition delay-100 `}/>

                                )}
                            </div>
                        </motion.div>
                    </div>
                    <div className={`${stage ===2 ? `mt-1 md:mt-5` : `mt-5 md:mt-8`}   flex w-full justify-center gap-2 scale-90 `}>

                        <p className={`text-slate-500 `}>Have an account? </p>
                        <Link className={`text-sky-400 transition hover:scale-105  active:scale-90  delay-75`}
                              href={'/Login'}>SignIn</Link>
                    </div>

                </div>
            </AnimatePresence>
        </AuthLayout>
    );
};

export default Forget;
