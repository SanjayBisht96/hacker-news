import { decryptData } from "api-utils/auth";
import prisma from "../../../database-utils/prismaObj";
import fetchUsername from "api-utils/fetchUsername";
import {pushReply} from 'api-utils/pusher';

export default async function addReply(req,res) {
    //console.log(postID);
    const {userID,parentID,commentInput} = req.body;
    if(userID&&parentID){
        const decryptedUserId = decryptData(userID);
        const username = await fetchUsername(decryptedUserId);
        await prisma.nextComment.create({
            data:{
                comment : commentInput,
                userID : decryptedUserId,
                parentCommentID: parentID,
                username : username
            }
        })
        await pushReply("Reply Added");
        return res.status(200).json({message: "successfully to added message"});            

    }
    return res.status(500).json({message: "failed to add message"});            
}