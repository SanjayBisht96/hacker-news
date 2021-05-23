import { useState, useEffect } from "react";
import { addComment } from '../client-utils/functions/handling.functions';
import { trigger }  from 'swr';
import { FETCH_COMMENTS_URL } from '../const';
import useAuth from "../hooks/useAuth";
import { getPusher } from 'client-utils/functions/util.function';

export default function useComments(postID){
    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const pusher = getPusher();
        const channel = pusher.subscribe('realtime');
        channel.bind("comment-event", function (data) {
            trigger([FETCH_COMMENTS_URL,postID]);
        });        
        async function updateComment(){
            const {id} = useAuth();
            if(newComment){
               let response = await addComment(postID,id,newComment);
            }
        }
        updateComment();
        
        return () => {
            pusher.unsubscribe("realtime");
          };      
    },[newComment]);

    return {
        commentList,
        setCommentList,
        newComment,
        setNewComment
    }
    
}