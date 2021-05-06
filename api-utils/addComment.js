import prisma from "../database-utils/prismaObj";

export default async function addComment(postID,userID,text) {
    //console.log(postID);
    let comment;
    if(postID&&userID){
        comment = await prisma.comment.create({
            comment : text,
            userID : userID
        })
        if(comment){
            await prisma.linkPostComment.create({
                postID:postID,
                commentID: comment.id
            })
        return comment;            
        }
    }
    return comment;
}