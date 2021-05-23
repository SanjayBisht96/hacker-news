import { decryptData } from "api-utils/auth";
import prisma from "database-utils/prismaObj";
import {COMMENT,POST,NEXTCOMMENT} from "const";
import {pushVote} from 'api-utils/pusher';

export default async function downVote(req,res) {
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
              if(postVote){
                let postDownVote = await prisma.linkPostVote.delete({
                  where: {
                    postId_userId: {
                      postId: ID,
                      userId : decryptedUserId
                    }
                  }
                });
                if(postDownVote){
                  Obj = await prisma.linkPost.update({
                      where: {
                        id: ID
                      },
                      data: {
                        upvotes:{
                            decrement: 1
                        } 
                      },
                    });
                    await pushVote("Down voted");
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
              if(commentVote){
                let commentDownVote = await prisma.commentVote.delete({
                  where: {
                    commentId_userId: {
                      commentId: ID,
                      userId : decryptedUserId
                    }
                  }
                });
                if(commentDownVote){     
                  Obj = await prisma.comment.update({
                      where: {
                        id: ID
                      },
                      data: {
                        upvotes:{
                            decrement: 1
                        } 
                      },
                    });
                  await pushVote("Down voted");                    
                }
              }
            }
                  break;
            case NEXTCOMMENT:{
                    const nextCommentVote = await prisma.nextCommentVote.findUnique({
                      where: {
                        nextCommentId_userId: {
                          nextCommentId: ID,
                          userId : decryptedUserId
                        }
                      },
                    });
                    if(nextCommentVote){
                      let nextCommentDownVote = await prisma.nextCommentVote.delete({
                        where: {
                          nextCommentId_userId: {
                            nextCommentId: ID,
                            userId : decryptedUserId
                          }
                        }
                      });
                      if(nextCommentDownVote){
                          Obj = await prisma.nextComment.update({
                              where: {
                                id: ID
                              },
                              data: {
                                upvotes:{
                                    decrement: 1
                                } 
                              },
                            });
                          await pushVote("Down voted");                            
                      }
                    }
                  }      
              break;
            default:
                break;
        }
        return res.status(200).json({message: "successfully to downvoted"});            
    }
    
    return res.status(500).json({message: "failed to add message"});            
}