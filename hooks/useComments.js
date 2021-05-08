import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { addComment, fetchComments } from '../client-utils/functions/handling.functions';
import useAuth from "../hooks/useAuth";
//import Pusher from 'pusher-js';
//import fetchComments from "../utils/fetchComments";

export default function useComments(postID){
    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState('');


    // useEffect(() => {
    //     async function updateCommentList(){
    //         let list = useSWR( ['/api/comment/fetchcomments',postID],fetchComments);
    //         setCommentList(commentList => list);
    //     }
    //     updateCommentList();
    // },[]);
    // const pusher = new Pusher(process.env.PUSHER_APP_ID, {
    //     cluster: process.env.PUSHER_CLUSTER
    //    });

    // const channel = pusher.subscribe('newComment');

    useEffect(() => {
        async function updateComment(){
            const {id} = useAuth();
            if(newComment){
               addComment(postID,id,newComment);
            //    channel.bind('comment-event', function() {
            //         console.log("received")
            //         return {message : "added"}
            //     });        
            }
        }
        updateComment();
        // async function updateCommentList(){
        //     let list = await fetchComments(postID);
        //     setCommentList(commentList => list);
        // }
        // updateCommentList();    
    },[newComment]);

    return {
        commentList,
        setCommentList,
        newComment,
        setNewComment
    }
    
}