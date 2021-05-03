import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all posts with pagination
export const getAllPostsDataWithPagination = async () => {
  return await prisma.linkPost.findMany({
    take: 20,
  });
};

// Edit a link post
export const editALinkPostData = async (linkPostId, linkPostData) => {
  return await prisma.linkPost.update({
    where: {
      id: linkPostId,
    },
    data: {
      ...linkPostData,
    },
  });
};

// Delete a link post
export const deleteALinkPostData = async (linkPostId) => {
  await prisma.linkPost.delete({
    where: {
      id: linkPostId,
    },
  });

  await prisma.linkPostTags.delete({
    where: {
      postID: linkPostId,
    },
  });
};
