import prisma from "../../../database-utils/prismaObj";

export default async function deletePost(req,res){
    const { postID } = req.body;
    const post = await prisma.linkPost.delete({
        where: {
          id: postID
        },
      })

   if(post){
    return res.status(200).json({message: "sucessfully deleted a post"});
   }else {
    return res.status(500).json({message: "failed to delete post"});
}
}

