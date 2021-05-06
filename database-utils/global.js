import { PrismaClient } from "@prisma/client";
import { NO_OF_POSTS_PER_PAGE } from "const";

const prisma = new PrismaClient();

// Get all posts with pagination
export const getAllPostsDataWithPagination = async (sortBy, page) => {
  // Sorting by date
  if (sortBy == "date") {
    return await prisma.linkPost.findMany({
      skip: NO_OF_POSTS_PER_PAGE * (page - 1),
      take: NO_OF_POSTS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return await prisma.linkPost.findMany({
    take: NO_OF_POSTS_PER_PAGE * page,
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
