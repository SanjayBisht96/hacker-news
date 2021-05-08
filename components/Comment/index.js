import {FormLabelTextAreaGroup} from  '../sections/FormElements';
import dynamic from 'next/dynamic';
import useReply from "../../hooks/useReply";
import { fetchReplies } from '../../client-utils/functions/handling.functions';
import { FETCH_REPLIES_URL } from '../../const';
import useSWR from 'swr';

const Reply = dynamic(() => import('./Reply'));

export default function Comment({comment,ID}){    
    const {reply, showReply, cancelReply, handleReply} = useReply();

    const {data ,error} = useSWR( [FETCH_REPLIES_URL,ID],fetchReplies);
    return (
        <>
        <div className="comment">
            <div className="comment_text">{comment}</div>
            {
                reply ?
                <div className="comment_box">
                    <FormLabelTextAreaGroup
                        label={"Add Reply"}
                        inputType={"text"}
                        id={ID}
                    />
                    <div className="comment_box_btn">
                        <div className="comment_box_btn_cancel btn btn-sm" data-id={ID} onClick={cancelReply} >Cancel</div> 
                        <div className="comment_box_btn_add btn btn-sm" data-id={ID} onClick={handleReply} >Reply</div> 
                    </div>
                </div>: <div className="comment_reply" data-id={ID} onClick={showReply} >Reply</div>

            }
            {
                data?.map((commentReply)=>{
                    return (
                        <Reply
                            key={commentReply.id}
                            text={commentReply.comment}
                            parentID={ID}
                        />
                    );
                })
            }
        </div>
        </>
    );
}