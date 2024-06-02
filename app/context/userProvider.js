"use client";
import {useEffect, useState} from "react";
import UserContext from "@/app/context/userContext";
import {currentUser, getALlUser} from "@/app/services/userService";
import {LoadingTImeFn} from "@/app/components/LoadingTImeFn";
import {getAllPost} from "@/app/services/postService";


const UserProvider=({children})=>{

    const [user,setUser]=useState(undefined);
    const [openProfile,setOpenProfile]=useState(false);
    const [updateProfileOpen,setUpdateProfile]=useState(false);
    const [openNewPost, setOpenNewPost]=useState(false);
    const [signupAvatarOpen,setSignupAvatarOpen]=useState(false);
    const [openPostPage,setOpenPostPage]=useState(false);
    const [postDialogData,setPostDialogData]=useState({});
    const [openLikeDialog,setOpenLikeDialog]=useState(false);
    const [likePageDataId,setLikePageDataId]=useState("");
    const [allUser,setAllUser]=useState([]);
    const [posts ,setPosts]=useState([]);
    const [showMyPost, setShowMyPost]=useState(false);
    const [showSavedPost , setShowSavedPost]=useState(false);
    const [openFilter,setOpenFilter]=useState(false);

    const [displayPosts,setDisplayPosts]=useState([]);

    const loadPost=async ()=>{
        try{
            const response = await getAllPost();
           setPosts(response);
        }catch (e) {
            console.log(e);

        }
    }


    const getUsers=async ()=>{
        try{
            const result=await getALlUser();
            setAllUser(result);
        }catch (e) {
            console.log(e);

        }
    }

    useEffect(()=>{
        async function load(){
            try{
                const logUser=await currentUser();
                setUser({...logUser});
                if(logUser){
                    LoadingTImeFn();
                    await loadPost();
                    await getUsers();
                }
                else{
                    console.log('');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        load();


    },[]);


    return(
        <UserContext.Provider value={{user,setUser,openProfile,setOpenProfile,signupAvatarOpen,setSignupAvatarOpen,
            updateProfileOpen,setUpdateProfile,openNewPost,setOpenNewPost,
            posts,setPosts,loadPost,openPostPage,setOpenPostPage,setPostDialogData,postDialogData,allUser,
            openLikeDialog,setOpenLikeDialog,likePageDataId,setLikePageDataId,
            getUsers,openFilter,setOpenFilter,showMyPost,setShowMyPost,showSavedPost,setShowSavedPost
        }}>
            {children}
        </UserContext.Provider>
    );


}
export default UserProvider;
