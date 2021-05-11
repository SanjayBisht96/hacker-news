import {FormLabelTextAreaGroup} from  '../sections/FormElements';
import dynamic from 'next/dynamic';
import useReply from "../../hooks/useReply";
import useVote from "../../hooks/useVote";
import { fetchReplies } from '../../client-utils/functions/handling.functions';
import { FETCH_REPLIES_URL,COMMENT } from '../../const';
import useSWR from 'swr';

const Reply = dynamic(() => import('./Reply'));

export default function Comment({comment,ID,username}){    
    const {reply, showReply, cancelReply, handleReply} = useReply();
    const {vote,downVote,upVote} = useVote(COMMENT,ID);

    const {data ,error} = useSWR( [FETCH_REPLIES_URL,ID],fetchReplies);
    return (
        <>
        <div className="comment">
        <div className="comment_data">
            <div className="comment_data_vote">
            <button className="btn btn-xs comment_data_vote_incvote">
              <svg
                onClick={upVote} 
                width="10"
                height="10"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41 22H3L22 2L41 22Z" stroke="black" strokeWidth="2" />
              </svg>
            </button>
            <button className="btn btn-xs comment_data_vote_decvote">
              <svg
                onClick={downVote} 
                width="10"
                height="10"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1L41 1L21 21L3 1Z" stroke="#252323" strokeWidth="2" />
              </svg>
            </button>
            </div>
                <span className="comment_data_upvotes">{vote} upvotes</span>
                <span className="comment_data_username">{username}</span>
            </div>
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
                            ID={commentReply.id}
                            username={commentReply.username}
                        />
                    );
                })
            }
        </div>
        </>
    );
}