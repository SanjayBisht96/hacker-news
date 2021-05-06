import {FormLabelTextAreaGroup} from  '../../sections/FormElements';
import {useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import { addReply, fetchReplies } from '../../../client-utils/functions/handling.functions';
import useSWR,{ mutate,trigger }  from 'swr';

export default function Reply({comment,parentID}){
    const [reply, setReply] = useState(false);
    const [replyList, setReplyList] = useState([]);
    const {data ,error} = useSWR( ['/api/comment/fetchreplies',parentID],fetchReplies);

    const handleReply = () => {
        let text = document.getElementById(parentID).value;
        const {id} = useAuth();
        if(text){
            addReply(id,parentID,text)
        }
    }

    return (
        <>
        <div>{comment}</div>
        {
            reply ?
                <div>
                    <FormLabelTextAreaGroup
                        label={"Add Reply"}
                        inputType={"text"}
                        id={parentID}
                    />
                    <div className="btn btn-md form__submit posting__container__content__form__submit" onClick={handleReply}>Comment</div>
                </div> 
                : <div>
                    <span onClick={()=>  setReply(true)}>Reply</span>  
                  </div>
        }        
        {
            data?.map((commentReply)=>{
                console.log(commentReply)
                return (
                <div>
                    <div>{commentReply.comment}</div>

                    reply ?
                    <div>
                        <FormLabelTextAreaGroup
                            label={"Add Reply"}
                            inputType={"text"}
                            id={parentID}
                        />
                        <div className="btn btn-md form__submit posting__container__content__form__submit" onClick={handleReply}>Comment</div>
                    </div> 
                    : <div>
                        <span onClick={()=>  setReply(true)}>Reply</span>  
                    </div>
                </div>);
            })


        }
        </>
    );
}