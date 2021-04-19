import prisma from "../../../database-utils/prismaObj";
import { Router } from 'next/router'

async function handleTags(formData,postID){
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
      await prisma.linkPostTags.create({
        data:{
            postID: postID,
            tagID : tag.id
        }
      });      
    });
}


export default async function postSubmit(req,res){
    const {formData} = req.body;
    //const { pid } = Router.query

    const user = await prisma.user.findUnique({
        where: {
          id:"1",
        },
      });

    if(!user){
      return res.status(500).json({message: "failed to save post"});
    }
    formData["userID"] = user.id;
    
    if(formData["id"]){
      const updatePost = await prisma.linkPost.update({
        where: {
          id: formData["id"]
        },
        data: {
          ...formData
        },
      });
      if(formData["tags"]){
        await handleTags(formData,updatePost.id);
      }
      if(updatePost){
        return res.status(200).json({message: "sucessfully updated a post"});
      }      
    }else{
      const CreatePost = await prisma.linkPost.create({
        data: {
          ...formData 
        }
      });
      if(formData["tags"]){
        await handleTags(formData,CreatePost.id);
      }
      if(CreatePost){
        return res.status(200).json({message: "sucessfully saved a post"});
      }      
    }


    return res.status(500).json({message: "failed to do the task"});


}
