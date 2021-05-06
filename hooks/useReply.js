import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { fetchReplies } from '../client-utils/functions/handling.functions';
import useAuth from "../hooks/useAuth";
//import fetchComments from "../utils/fetchComments";

export default function useReply(postID,parentID){
    const [replyList, setReplyList] = useState([]);
    

    useEffect(() => {
        async function updateReplyList(){
            let list = await fetchReplies (postID,parentID);
            setReplyList(replyList => list);
        }
        updateReplyList();
    },[]);


    return {
        replyList
    }
    
}