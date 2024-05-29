import {httpAxios} from "../helper/httpHelper";

export const openaiFn =async (Data)=>{

    const result= await httpAxios
        .post("/api/openai",Data)
        .then((response)=>response.data);
    return result;

}
