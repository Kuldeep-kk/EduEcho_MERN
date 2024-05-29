import {httpAxios} from "../helper/httpHelper";

export const signup=async (user,imgDataURL)=>{

    const result=await httpAxios
        .post('/api/users',{...user,imgDataURL})
        .then((response)=>response.data);
    return result;

}


export const checkEmail=async (email)=>{

    const result=await httpAxios
        .put(`/api/users/checkuser`,{email})
        .then((response)=>response.data);
    return result;

}

export const login =async (loginData)=>{

    const result= await httpAxios
        .post("/api/login",loginData)
        .then((response)=>response.data);
    return result;

}


export async function currentUser(){

    const result=await httpAxios
        .get("/api/current")
        .then((response)=> response.data);
    return result;
}
export const resetPassword=async (userId,data)=>{

    const result=await httpAxios
        .put(`/api/users/${userId}/resetpassword`,{...data})
        .then((response)=>response.data);
    return result;

}

export const changePassword=async (data)=>{

    const result=await httpAxios
        .put("/api/users/forget",{...data})
        .then((response)=>response.data);
    return result;
}

export async function logout(){

    const result= await httpAxios
        .post("/api/logout")
        .then((response)=>response.data);
    return result;
}

export async function getALlUser(){
    const result=await httpAxios
        .get("/api/users")
        .then((response)=> response.data);
    return result;
}




