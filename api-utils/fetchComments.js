import prisma from "../database-utils/prismaObj";

export default async function fetchComments(postID) {
    if(postID){
        return await prisma.linkPostComment.findMany({
            where:{
                postID: postID
            }
        })
    }
    return [];
}