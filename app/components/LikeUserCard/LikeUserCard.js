import React from 'react';

const LikeUserCard = ({username,userProfileUrl,designation}) => {
    return (
        <div className={`flex`}>
            <div className={`flex justify-center items-center`}>
                <div></div>
                <div>{username}</div>

            </div>
            <div></div>



        </div>
    );
};

export default LikeUserCard;