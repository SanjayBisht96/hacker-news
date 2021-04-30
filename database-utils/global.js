import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all posts with pagination
export const getAllPostsDataWithPagination = async () => {
  return await prisma.linkPost.findMany({
    take: 20,
  });
};

// Get tag data if tag name exists
export const getTagDataIfTagExists = async (tagName) => {
  return await prisma.tag.findFirst({
    where: {
      name: tagName,
    },
  });
};
