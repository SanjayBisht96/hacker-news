import prisma from "../database-utils/prismaObj";


async function asyncForEach(array, commentList, callback) {
    let count = 0;
    for (let index = 0; index < array.length; index++) {
      count += await callback(array[index], index, array);
    }
    return count;
  }


export default async function fetchNoOfComments(postID) {
    if(postID){
        const linkPostCommentList = await prisma.linkPostComment.findMany({
            where:{
                postID: postID
            }
        });
        let noOfComments = linkPostCommentList.length;

        if(linkPostCommentList){
            const start = async () => {
                let count = await asyncForEach(linkPostCommentList, [],async (linkPostComment) => {
                // let comment = await prisma.comment.findUnique({
                //     where:{
                //         id: linkPostComment.commentID
                //     }
                // });
                let noOfReplies = await prisma.nextComment.count({
                    where:{
                        parentCommentID : linkPostComment.commentID,
                    }
                });
                return noOfReplies;
              });
              return count;
            }
            noOfComments += await start();
            
            return noOfComments;
        }            

    }
    return 0;
}