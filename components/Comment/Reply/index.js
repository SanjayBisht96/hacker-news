import {FormLabelTextAreaGroup} from  '../../sections/FormElements';
import useReply from "../../../hooks/useReply";

export default function Reply({parentID,text}){
    const {reply, showReply, cancelReply, handleReply} = useReply();
    return (
        <>
        <div className="reply">
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