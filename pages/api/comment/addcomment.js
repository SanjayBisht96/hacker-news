import { decryptData } from "api-utils/auth";
import fetchUsername from "api-utils/fetchUsername";
import prisma from "../../../database-utils/prismaObj";
import {pushComment} from 'api-utils/pusher';

export default async function addComment(req,res) {
    const {postID,userID,commentInput} = req.body;
    let commentObj;
    if(postID&&userID){
        const decryptedUserId = decryptData(userID);
        const username = await fetchUsername(decryptedUserId);
        commentObj = await prisma.comment.create({
            data:{
                comment : commentInput,
                userID : decryptedUserId,
                username : username
            }
        })
        if(commentObj){
            await prisma.linkPostComment.create({
                data:{
                    postID:postID,
                    commentID: commentObj.id
                }
            })
        await pushComment("done pushing");
        return res.status(200).json({message: "successfully to added message"});            
        }
    }
    return res.status(500).json({message: "failed to add message"});            
}