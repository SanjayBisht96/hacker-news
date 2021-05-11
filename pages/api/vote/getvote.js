import { decryptData } from "api-utils/auth";
import prisma from "database-utils/prismaObj";
import {COMMENT,POST,NEXTCOMMENT} from "const";


export default async function getVote(req,res) {
    //console.log(postID);
    const {ID,type} = req.body;
    let Obj;
    if(ID&&type){
        switch(type){
            case POST:
                Obj = await prisma.linkPost.findUnique({
                    where: {
                      id: ID
                    },
                    select:{
                        upvotes: true
                    }
                  })
                break;
            case COMMENT:
                Obj = await prisma.comment.findUnique({
                    where: {
                      id: ID
                    },
                    select:{
                        upvotes: true
                    }
                  })
                  break;
            case NEXTCOMMENT:
                Obj = await prisma.nextComment.findUnique({
                    where: {
                      id: ID
                    },
                    select:{
                        upvotes: true
                    }
                  })                
                break;
            default:
                break;
        }
        return res.status(200).send(Obj.upvotes);
    }
    
    return res.status(500).json({message: "failed to add message"});            
}