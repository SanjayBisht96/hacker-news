import { useState, useEffect } from "react";

export default function useComments(comments){
    const [commentList, setCommentList] = useState(comments);

    useEffect(() => {

    },[]);

    return {
        commentList,
        setCommentList
    }
    
}