import { useState, useEffect } from "react";
import { trigger }  from 'swr';
import { updateVote, getVote  } from '../client-utils/functions/handling.functions';
import {updateVoteModel, getVoteModel} from 'models/user';
import useAuth from "../hooks/useAuth";
import { ADD_VOTE_URL, DOWN_VOTE_URL, GET_VOTE_URL } from 'const';
import { getPusher } from 'client-utils/functions/util.function';


export default function useVote(type,targetID){
    
    const [vote, setVote] = useState(0);
    const [toggle, setToggle] = useState(false);

    const downVote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {id} = useAuth();
        const payload = updateVoteModel(id,targetID,type);
        const pusher = getPusher();
        const channel = pusher.subscribe('realtime');    
    
        if(id&&targetID&&type){
            updateVote(DOWN_VOTE_URL,payload);
            channel.bind("vote-event", function () {
                setToggle(toggle => !toggle);
                pusher.unsubscribe('realtime');
            });
        }        
    }
    
    const upVote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {id} = useAuth(); 
        const payload = updateVoteModel(id,targetID,type);
        const pusher = getPusher();
        const channel = pusher.subscribe('realtime');    

        if(id&&targetID&&type){
            updateVote(ADD_VOTE_URL,payload);
            channel.bind("vote-event", function () {
                setToggle(toggle => !toggle);
                pusher.unsubscribe('realtime');
            });              
        }
    }

    useEffect(() => {
        async function fetchVote(){
            let payload = getVoteModel(targetID ,type);
            let upvotes = await getVote(GET_VOTE_URL,payload);
            setVote(vote => upvotes);
        }
        fetchVote();
    }, [toggle])

    return {
        vote,
        downVote,
        upVote
    }
    
}