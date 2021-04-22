import {FormLabelTextAreaGroup} from  '../sections/FormElements';

export default function Comment({comment}){
    return (
        <>
        <div>{comment.text}</div>
            <FormLabelTextAreaGroup
                label={"Add Comment"}
                inputType={"text"}
                id={"commentInput"}
            />
        </>
    );
}