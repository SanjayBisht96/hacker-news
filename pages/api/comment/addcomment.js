import { decryptData } from "api-utils/auth";
import prisma from "../../../database-utils/prismaObj";

export default async function addComment(req,res) {
    //console.log(postID);
    const {postID,userID,commentInput} = req.body;
    let commentObj;
    if(postID&&userID){
        const decryptedUserId = decryptData(userID);
        commentObj = await prisma.comment.create({
            data:{
                comment : commentInput,
                userID : decryptedUserId
            }
        })
        if(commentObj){
            await prisma.linkPostComment.create({
                data:{
                    postID:postID,
                    commentID: commentObj.id
                }
            })
        return res.status(200).json({message: "successfully to added message"});            
        }
    }
    return res.status(500).json({message: "failed to add message"});            
}