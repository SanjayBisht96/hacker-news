import prisma from "../database-utils/prismaObj";

export default async function fetchUsername(userID) {
    let userObj;
    if(userID){
        userObj = await prisma.user.findUnique({
            where:{
                id: userID
            },
            select:{
                name:true
            }
        });
        if(userObj) return userObj.name;
    }
    return;
}