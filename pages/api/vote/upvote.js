import { decryptData } from "api-utils/auth";
import prisma from "database-utils/prismaObj";
import {COMMENT,POST,NEXTCOMMENT} from "const";

export default async function upVote(req,res) {
    //console.log(postID);
    const {ID,userID,type} = req.body;
    let Obj;
    if(ID&&userID&&type){
        const decryptedUserId = decryptData(userID);
        switch(type){
            case POST:
                Obj = await prisma.linkPost.update({
                    where: {
                      id: ID
                    },
                    data: {
                      upvotes:{
                          increment: 1
                      } 
                    },
                  })
                break;
            case COMMENT:
                Obj = await prisma.comment.update({
                    where: {
                      id: ID
                    },
                    data: {
                      upvotes:{
                          increment: 1
                      } 
                    },
                  })
                  break;
            case NEXTCOMMENT:
                Obj = await prisma.nextComment.update({
                    where: {
                      id: ID
                    },
                    data: {
                      upvotes:{
                          increment: 1
                      } 
                    },
                  })                
                break;
            default:
                break;
        }
        return res.status(200).json({message: "successfully to upvoted"});            
    }
    
    return res.status(500).json({message: "failed to add message"});            
}