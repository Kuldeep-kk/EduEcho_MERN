"use client";
import React, {useContext, useState} from 'react';
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import styles from "./login.module.css";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {TbPasswordFingerprint} from "react-icons/tb";
import {Button} from "@mui/material";
import Link from "next/link";
import {SiAcclaim} from "react-icons/si";
import {useRouter} from "next/navigation";
import {login} from "@/app/services/userService";
import Swal from "sweetalert2";
import UserContext from "@/app/context/userContext";

const Login = () => {
    
    const router=useRouter();
    const context=useContext(UserContext);

    const [userData, setUserData] = useState({
        email: "", password: ""
    });

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
    const ToastBottom = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const loginFn=async ()=>{
        console.log(userData);
        
        try {

            const result=await login(userData);
            console.log(result);
            context.setUser(result.user);
            ToastBottom.fire({
                icon: "success",
                title: "Login Success"
            });
            console.log("Login Success");
            await context.loadPost();
            router.push('/Home');


            
        }
        catch (e) {
            Toast.fire({
                icon: "error",
                title: "Check your credential"
            });

            console.log(e);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginFn();
        }
    };

    return (<AuthLayout>
        <div className={`relative h-full w-full `}>
            <div className={`md:p-5 flex flex-col gap-2`}>
                <h2 className={`text-center md:text-left text-xl font-bold text-slate-500 ${styles.mainHeading}`}>
                    Welcome back to <span className={`text-pink-400 text-2xl italic `}>EduEcho!</span>
                </h2>
                <p className={`text-center md:text-left text-sm text-slate-400`}>Where every lesson is a new discovery.</p>
            </div>
            <div className={`flex flex-col  justify-center items-center mt-7 gap-8 `}>
                <div>
                    <div className={`p-inputgroup flex-1 md:w-72 ${styles.inputGroup}`}>
                     <span className={`p-inputgroup-addon ${styles.emailSymbol}`}>
        <i className="pi pi-user"></i>
    </span>
                        <span className="p-float-label">
                        <InputText id="username" value={userData.email}
                                   className={`h-10 text-sm text-slate-500 pl-3 ${styles.inputOverride}`}
                                   onChange={(e) => setUserData({...userData, email: e.target.value})}
                                   onKeyPress={handleKeyPress}/>
                     <label htmlFor="username">Username</label>
                    </span>
                    </div>
                </div>
                <div className={`flex flex-col gap-2`}>
                    <div className={`p-inputgroup flex-1 md:w-72  ${styles.inputGroup}`}>
                        <span className="p-inputgroup-addon">
        <i><TbPasswordFingerprint/></i>
    </span>
                        <span className="p-float-label">
      <Password inputId="password"
                className={`h-10 text-sm text-slate-500  ${styles.inputOverride}`}
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}
                toggleMask
                feedback={false} tabIndex={1}
                onKeyPress={handleKeyPress}

      />
                            <label htmlFor="password">Password</label>
                        </span>

                    </div>
                    <Link href={"/Forget"}
                          className={`text-slate-400 text-sm text-center md:ml-28 ml-14 transition delay-100 hover:text-sky-400 `}>Forget
                        your password?</Link>
                </div>


                <button
                    className={`${styles.loginBtn} px-20 h-10 text-white flex flex-row justify-center items-center gap-3 transition hover:scale-105  active:scale-90  delay-75`}
                    onClick={loginFn}>Login <SiAcclaim size={15} className={`rotate-90`}/></button>

            </div>
            <div className={`mt-10 flex w-full justify-center gap-2  `}>

                <p className={`text-slate-500 `}>Don't have an account yet? </p>
                <Link className={`text-sky-400 transition hover:scale-105  active:scale-90  delay-75`}
                      href={'/Signup'}>SignUp </Link>
            </div>

        </div>
    </AuthLayout>);
};

export default Login;