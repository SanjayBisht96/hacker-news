import prisma from "../../../database-utils/prismaObj";

async function handleTags(formData,askID){
    const tagList = formData["tags"].match(/[a-zA-Z]+/g);

    tagList.forEach(async (tagName) => {
      let tag = await prisma.tag.findUnique({
        where: {
          name: tagName,
        },
      });
      if(!tag){
       tag =  await prisma.tag.create({
          data: {
            name: tagName
          } 
        });
      }
      await prisma.askTags.create({
        data:{
            askID: askID,
            tagID : tag.id
        }
      });      
    });
}


export default async function submit(req,res){
    const {formData} = req.body;
    const user = await prisma.user.findUnique({
        where: {
          id:"1",
        },
      });
    
    if(!user){
      return res.status(500).json({message: "failed to save post"});
    }
    formData["userID"] = user.id;
    const CreateAskPost = await prisma.ask.create({ data: formData });
    if(formData["tags"]){
      await handleTags(formData,CreateAskPost.id);
    }
    if(CreateAskPost){
        return res.status(200).json({message: "sucessfully saved a post"});
    }else {
        return res.status(500).json({message: "failed to save post"});
    }

}
