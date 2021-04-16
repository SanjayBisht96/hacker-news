import { PrismaClient } from '@prisma/client'

export default async function fetchAsk() {
    const prisma = new PrismaClient();
    return await prisma.ask.findMany();
}