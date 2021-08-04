import React from 'react'

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export const GetTimeGap = (time) => {
    const now = new Date();
    const timeGap = now - time;
    console.log(timeGap);
    if (timeGap < minute){
        return "just now";
    }
    else if (timeGap < hour){
        const m = (timeGap / minute) / 1000;
        return m + " min ago";
    }

    else if  (timeGap < hour * 24){
        const h = (timeGap / hour) / 1000;
        if (h <= 1)
            return "an hour ago";
        else
            return h + " hours ago";
    }

    else if (timeGap < (hour * 24 * 30)){
        const d = (timeGap / ( hour * 24)) / 1000;
        if (d <= 1)
            return "a day ago";
        else
            return d + " days ago";
    }

    else if ((timeGap < (hour * 24 * 30 * 12)) / 1000){
        const month = (timeGap / ( hour * 24 * 30)) / 1000;
        if (month <= 1)
            return "a month ago";
        else
            return month + " months ago";
    }
    else{
        const year = (timeGap / ( hour * 24 * 30 * 12)) / 1000;
        if (year <= 1){
            return "a year ago";
        }
        else{
            return year + " years ago";
        }
    }
}
