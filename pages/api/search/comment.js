import prisma from "database-utils/prismaObj";

export default async function comment(req,res) {
    const { searchTerm } = req.body;
        
    let commentObj = await prisma.comment.findMany({
        where:{
            comment: {
                contains: searchTerm,
            }
        },
    });

    let nextCommentObj = await prisma.nextComment.findMany({
        where:{
            comment: {
                contains: searchTerm,
            }
        },
    });
    
    let allComments = [...commentObj, ...nextCommentObj];

    return res.status(200).send(allComments);

    
}