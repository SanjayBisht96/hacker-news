import { decryptData } from "api-utils/auth";
import prisma from "../../../database-utils/prismaObj";

export default async function addReply(req,res) {
    //console.log(postID);
    const {userID,parentID,commentInput} = req.body;
    let commentObj;
    if(userID&&parentID){
        const decryptedUserId = decryptData(userID);
        await prisma.nextComment.create({
            data:{
                comment : commentInput,
                userID : decryptedUserId,
                parentCommentID: parentID
            }
        })
        return res.status(200).json({message: "successfully to added message"});            

    }
    return res.status(500).json({message: "failed to add message"});            
}