
const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export const GetTimeGap = (time) => {
    const now = new Date();
    const t = new Date(time);

    const timeGap = now.getTime() - t.getTime(); //milliseconds
    if (timeGap < minute){
        return "just now";
    }
    else if (timeGap < hour){
        const m = parseInt(timeGap / minute);
        if(m <= 1)
            return "a min ago";
        else
            return m + " mins ago";
    }

    else if  (timeGap < hour * 24){
        const h = parseInt(timeGap / hour);
        if (h <= 1)
            return "an hour ago";
        else
            return h + " hours ago";
    }

    else if (timeGap < (hour * 24 * 30)){
        const d = parseInt(timeGap / ( hour * 24));
        if (d <= 1)
            return "a day ago";
        else
            return d + " days ago";
    }

    else if ((timeGap < (hour * 24 * 30 * 12))){
        const month = parseInt(timeGap / ( hour * 24 * 30));
        if (month <= 1)
            return "a month ago";
        else
            return month + " months ago";
    }
    else{
        const year = parseInt(timeGap / ( hour * 24 * 30 * 12));
        if (year <= 1){
            return "a year ago";
        }
        else{
            return year + " years ago";
        }
    }
}

export const GetCategory = (c) => {
    if (c === "일반"){
        return "general"
    }
    if (c === "공지"){
        return "notice"
    }
    if (c === "질문"){
        return "question"
    }
    if (c === "의견"){
        return "feedback"
    }
    if (c === "general"){
        return "일반"
    }
    if (c === "feedback"){
        return "의견"
    }
    if (c === "question"){
        return "질문"
    }
    if (c === "notice"){
        return "공지"
    }
}