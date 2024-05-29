"use client";
import React, {useTransition} from 'react';
const PhotoLists = ({photos}) => {

    return (
        <div>
            {photos.length>0 && <h2 className={`text-3xl text-center mt-5 font-bold text-gray-500 `}>Your Images</h2>}
            {
                photos.map((photo)=>(
                    <PhotoCard key={photo?.public_id} url={photo?.secure_url}
                               handleDelete={()=>handleDelete(photo?.public_id)}
                    />

                ))
            }

        </div>
    );
};

export default PhotoLists;
