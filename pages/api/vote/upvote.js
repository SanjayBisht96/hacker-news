import { decryptData } from "api-utils/auth";
import prisma from "database-utils/prismaObj";
import {COMMENT,POST,NEXTCOMMENT} from "const";
import {pushVote} from 'api-utils/pusher';

export default async function upVote(req,res) {
    //console.log(postID);
    const {ID,userID,type} = req.body;
    let Obj;
    if(ID&&userID&&type){
        const decryptedUserId = decryptData(userID);
        switch(type){
            case POST:{
                const postVote = await prisma.linkPostVote.findUnique({
                  where: {
                    postId_userId: {
                      postId: ID,
                      userId : decryptedUserId
                    }
                  },
                });
                
                if(!postVote){
                  let addPostVote = await prisma.linkPostVote.create({
                    data: {
                        postId: ID,
                        userId : decryptedUserId
                    },
                  });        
                  if(addPostVote){
                    Obj = await prisma.linkPost.update({
                        where: {
                          id: ID
                        },
                        data: {
                          upvotes:{
                              increment: 1
                          } 
                        },
                      });
                      await pushVote("Added vote");
                  }
                }
                break;
            }
            case COMMENT:{
                const commentVote = await prisma.commentVote.findUnique({
                  where: {
                    commentId_userId: {
                      commentId: ID,
                      userId : decryptedUserId
                    }
                  },
                });              
                if(!commentVote){
                  let addCommentVote = await prisma.commentVote.create({
                    data: {
                        commentId: ID,
                        userId : decryptedUserId
                    },
                  });
                  if(addCommentVote){
                    Obj = await prisma.comment.update({
                        where: {
                          id: ID
                        },
                        data: {
                          upvotes:{
                              increment: 1
                          } 
                        },
                      });
                    await pushVote("Added vote");
                  }
                }                  
                  break;
            }
            case NEXTCOMMENT:{
                const nextCommentVote = await prisma.nextCommentVote.findUnique({
                  where: {
                    nextCommentId_userId: {
                      nextCommentId: ID,
                      userId : decryptedUserId
                    }
                  },
                });              
                if(!nextCommentVote){
                  let addNextCommentVote = await prisma.nextCommentVote.create({
                    data: {
                        nextCommentId: ID,
                        userId : decryptedUserId
                    },
                  });
                  if(addNextCommentVote){
                      Obj = await prisma.nextComment.update({
                          where: {
                            id: ID
                      },
                      data: {
                        upvotes:{
                            increment: 1
                        } 
                      },
                    });
                    await pushVote("Added vote");
                  }
                }
                break;
              }
            default:
                break;
        }
        return res.status(200).json({message: "successfully to upvoted"});            
    }
    
    return res.status(500).json({message: "failed to add message"});            
}