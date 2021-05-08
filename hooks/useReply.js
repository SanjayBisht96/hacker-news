import { useState } from "react";
import { trigger }  from 'swr';
import { addReply } from '../client-utils/functions/handling.functions';
import useAuth from "../hooks/useAuth";
import { FETCH_REPLIES_URL } from '../const';


export default function useReply(){
    
    const [reply, setReply] = useState(false);

    const showReply = () => {
        setReply(reply => true);
    }

    const cancelReply = () => {
        setReply(reply => false);
    }
    
    const handleReply = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let targetID = event.target.getAttribute("data-id");
        let text = document.getElementById(targetID).value;
        const {id} = useAuth(); 
        if(text){
            addReply(id,targetID,text);
            setTimeout(()=>{
                trigger([FETCH_REPLIES_URL,targetID]);
            },1500);            
        }
        setReply(reply => false);
    }



    return {
        reply,
        showReply,
        cancelReply,
        handleReply
    }
    
}