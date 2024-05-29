import {httpAxios} from "../helper/httpHelper";

export const mailer=async (data)=>{
    const result=await httpAxios
        .post('/api/mailer',{...data})
        .then((response)=>response.data);
    return result;
}