import React from 'react';

const FormatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInDays = Math.floor((currentDate - createdAtDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
        return 'Today';
    } else if (differenceInDays === 1) {
        return 'Yesterday';
    } else {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${createdAtDate.getDate()} ${monthNames[createdAtDate.getMonth()]}`;
    }
};

export default FormatDate;