import {FormLabelTextAreaGroup} from  '../sections/FormElements';
import {Reply} from '../';

export default function Reply({comment}){
    return (
        <>
        <div>{comment}</div>
            <FormLabelTextAreaGroup
                label={"Add Comment"}
                inputType={"text"}
                id={"commentInput"}
            />
        </>
    );
}