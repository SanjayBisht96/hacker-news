import prisma from "../../../database-utils/prismaObj";
import fetchNoOfComments from "api-utils/fetchNoOfComments";

async function asyncForEach(array, commentList, callback) {
    for (let index = 0; index < array.length; index++) {
      commentList.push(await callback(array[index], index, array));
    }
    return commentList;
  }


export default async function fetchComments(req,res) {
    const {postID} = req.body;
    if(postID){
        const linkPostCommentList = await prisma.linkPostComment.findMany({
            where:{
                postID: postID
            }
        })
        if(linkPostCommentList){
            let commentList = [];
            const start = async (commentList) => {
                commentList = await asyncForEach(linkPostCommentList, [],async (linkPostComment) => {
                let comment = await prisma.comment.findUnique({
                    where:{
                        id: linkPostComment.commentID
                    }
                });
                return comment;
              });
              return commentList;
            }
            commentList = await start(commentList);
            let noOfComments = await fetchNoOfComments(postID);
            return res.status(200).json({commentList,noOfComments});            
        }
    }
    return res.status(500).json({message: "failed to get comments"});                  
}