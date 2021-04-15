import { PrismaClient } from '@prisma/client'

export default async function fetchPost() {
    const prisma = new PrismaClient();
    return await prisma.linkPost.findMany();
}