import { useState, useEffect, useRef } from "react";
import {POST,ASKPOST,COMMENT, SEARCH_POST_URL, SEARCH_COMMENT_URL } from 'const';
import { searchPostComment } from 'client-utils/functions/handling.functions';
import useSWR from 'swr';

export default function useSearch(){
    
    const [result, setResult] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [searchType, setSearchType] = useState();

    useEffect(() => {
        
        async function fetchResult(){
            switch(searchType){
                case POST:
                    const postData = await searchPostComment(SEARCH_POST_URL,searchTerm);
                    setResult(result => postData);
                    break;
                case ASKPOST:
                    break;
                case COMMENT:
                    const data = await searchPostComment(SEARCH_COMMENT_URL,searchTerm);
                    setResult(result => data);
                    break;
                default:
                    
            }
        }
        fetchResult();
    }, [searchTerm])

    return {
        result,
        searchTerm,
        setSearchTerm,
        setSearchType,
        searchType
    }
    
}
