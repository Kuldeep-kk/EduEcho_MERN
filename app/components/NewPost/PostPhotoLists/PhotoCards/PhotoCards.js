import React, {useTransition} from 'react';
import Image from "next/image";
import {RxCross2} from "react-icons/rx";

const PhotoCards = ({url,handleDelete}) => {
    const [isPending,startTransition]=useTransition();
    return (
        <div className={`flex relative ml-5 w-14 h-14`}>
            <img src={url} alt={""} className={`shadow-2xl rounded-xl w-14 h-14`}/>
            <RxCross2 size={20} className={`absolute top-0 left-0 hover:text-red-500 transition delay-100 text-slate-400`} onClick={()=>startTransition(handleDelete)}/>

        </div>

    );
};

export default PhotoCards;