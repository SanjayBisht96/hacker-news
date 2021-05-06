import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { addComment, fetchComments } from '../client-utils/functions/handling.functions';
import useAuth from "../hooks/useAuth";
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

    useEffect(() => {
        async function updateComment(){
            const {id} = useAuth();
            if(newComment){
               addComment(postID,id,newComment);
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