import prisma from "../database-utils/prismaObj";

export default async function fetchPost(postID) {
    if(postID){
        return await prisma.linkPost.findUnique({
            where:{
                id: postID
            }
        })
    }
    return await prisma.linkPost.findMany();
}