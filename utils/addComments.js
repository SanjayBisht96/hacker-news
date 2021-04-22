import prisma from "../database-utils/prismaObj";

export default async function addComment(postID,userID,text) {
    if(postID&&userID){
        const comment = await prisma.comment.create({
            comment : text,
            userID : userID
        })
        if(comment){
            await prisma.linkPostComment.create({
                postID:postID,
                commentID: comment.id
            })
        }
    }
    return [];
}