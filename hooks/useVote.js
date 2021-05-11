import { useState, useEffect } from "react";
import { trigger }  from 'swr';
import { updateVote, getVote  } from '../client-utils/functions/handling.functions';
import {updateVoteModel, getVoteModel} from 'models/user';
import useAuth from "../hooks/useAuth";
import { ADD_VOTE_URL, DOWN_VOTE_URL, GET_VOTE_URL } from 'const';


export default function useVote(type,targetID){
    
    const [vote, setVote] = useState(0);
    const [toggle, setToggle] = useState(false);

    const downVote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {id} = useAuth();
        const payload = updateVoteModel(id,targetID,type);
        if(id&&targetID&&type){
            updateVote(DOWN_VOTE_URL,payload);
            setTimeout(()=>{
                trigger([DOWN_VOTE_URL,payload]);
                setToggle(toggle => !toggle);
            },500);            
        }        
    }
    
    const upVote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {id} = useAuth(); 
        const payload = updateVoteModel(id,targetID,type);
        if(id&&targetID&&type){
            updateVote(ADD_VOTE_URL,payload);

            setTimeout(()=>{
                trigger([ADD_VOTE_URL,payload]);
                setToggle(toggle => !toggle);
            },500);            
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