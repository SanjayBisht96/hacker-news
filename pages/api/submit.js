import { PrismaClient, Prisma } from '@prisma/client'

export default async function submit(req,res){
    const prisma = new PrismaClient();
    const {formData} = req.body;
    const user = await prisma.user.findUnique({
        where: {
          id:1,
        },
      });
    formData["userID"] = user.id;
    const createUser = await prisma.post.create({ data: formData })
    if(createUser){
        return res.status(200).json({message: "sucessfully saved a post"});
    }else {
        return res.status(500).json({message: "failed to save post"});
    }

}
