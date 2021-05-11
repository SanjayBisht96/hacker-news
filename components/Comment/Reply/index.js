import {FormLabelTextAreaGroup} from  '../../sections/FormElements';
import useReply from "../../../hooks/useReply";
import useVote from "../../../hooks/useVote";
import { NEXTCOMMENT } from '../../../const';

export default function Reply({ID,parentID,text,username}){
    const {reply, showReply, cancelReply, handleReply} = useReply();
    const {vote,downVote,upVote} = useVote(NEXTCOMMENT,ID);
    return (
        <>
        <div className="reply">
        <div className="reply_data">            
            <div className="reply_data_vote">
            <button className="btn btn-xs reply_data_vote_upvote">
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
            <button className="btn btn-xs reply_data_vote_downvote">
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
                <span className="_data_upvotes">{vote} upvotes</span>
                <span className="reply_data_username">{username}</span>
            </div>            
            <div className="reply_text">{text}</div>
            <div className="reply_show" data-id={parentID} onClick={showReply} >Reply</div>
            {
                reply ?
                <div className="reply_box">
                    <FormLabelTextAreaGroup
                        label={"Add Reply"}
                        inputType={"text"}
                        id={parentID}
                    />
                    <div className="reply_box_btn">
                        <div className="reply_box_btn_cancel btn btn-sm" data-id={parentID} onClick={cancelReply} >Cancel</div> 
                        <div className="reply_box_btn_add btn btn-sm" data-id={parentID} onClick={handleReply} >Reply</div> 
                    </div>
                </div>:''

            }
        </div>
        </>
    );
}