import prisma from "database-utils/prismaObj";

export default async function linkPost(req,res) {
    const { searchTerm } = req.body;
    let Obj;
    
    Obj = await prisma.linkPost.findMany({
        where:{
            OR: [
                    {
                        title: {
                            contains: searchTerm
                        }
                },
                {
                    url: {
                        contains: searchTerm
                    }
                }
            ]
        }
    });
    if(Obj){
        return res.status(200).send(Obj);
    }
    
    
    return res.status(500).json({message: "failed to get post"});            
}