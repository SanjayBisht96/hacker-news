import { useState } from "react";
import { trigger }  from 'swr';
import { addReply } from '../client-utils/functions/handling.functions';
import useAuth from "../hooks/useAuth";
import { FETCH_REPLIES_URL } from '../const';
import { getPusher } from 'client-utils/functions/util.function';


export default function useReply(){
    
    const [reply, setReply] = useState(false);
    const pusher = getPusher();
    const channel = pusher.subscribe('realtime');

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
            channel.bind("reply-event", function () {
                trigger([FETCH_REPLIES_URL,targetID]);
            });            
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