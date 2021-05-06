import prisma from "../../../database-utils/prismaObj";


async function asyncForEach(array, commentList, callback) {
    for (let index = 0; index < array.length; index++) {
      commentList.push(await callback(array[index], index, array));
    }
    return commentList;
  }


export default async function fetchReplies(req,res) {
    const {parentID} = req.body;
    if(parentID){
        const replyList = await prisma.nextComment.findMany({
            where:{
                parentCommentID: parentID
            }
        })
        // if(replyList&&parentID){
        //     //console.log(linkPostCommentList);
        //     let commentList = [];
        //     const start = async (commentList) => {
        //         commentList = await asyncForEach(replyList, [],async (reply) => {
        //         let comment = await prisma.nextComment.findUnique({
        //             where:{
        //                 parentCommentID: linkPostComment.commentID
        //             }
        //         });
        //         return comment;
        //       });
        //       return commentList;
        //     }
        //     commentList = await start(commentList);
        //     return res.status(200).json(commentList);            
        // }
        return res.status(200).json(replyList);
    }
    return res.status(500).json({message: "failed to get replies"});                  
}