import { decryptData } from "api-utils/auth";
import fetchUsername from "api-utils/fetchUsername";
import prisma from "../../../database-utils/prismaObj";
//import Pusher from 'pusher';


// const pusher = new Pusher({
//     appId: process.env.PUSHER_APP_ID,
//     key: process.env.PUSHER_KEY,
//     secret: PUSHER_SECRET,
//     cluster: PUSHER_CLUSTER,
//     useTLS: true,
//   });

export default async function addComment(req,res) {
    //console.log(postID);
    const {postID,userID,commentInput} = req.body;
    let commentObj;
    if(postID&&userID){
        const decryptedUserId = decryptData(userID);
        const username = await fetchUsername(decryptedUserId);
        commentObj = await prisma.comment.create({
            data:{
                comment : commentInput,
                userID : decryptedUserId,
                username : username
            }
        })
        if(commentObj){
            await prisma.linkPostComment.create({
                data:{
                    postID:postID,
                    commentID: commentObj.id
                }
            })
            // pusher.trigger("newComment", "comment-event", {
            //     message: "hello world",
            //   });            
        return res.status(200).json({message: "successfully to added message"});            
        }
    }
    return res.status(500).json({message: "failed to add message"});            
}