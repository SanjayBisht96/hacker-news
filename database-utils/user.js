import { PrismaClient } from "@prisma/client";
import { NO_OF_POSTS_PER_PAGE } from "const";

const prisma = new PrismaClient();

// Check if username already exists
export const userDataIfExists = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

// Check if username already exists
export const getUserDataById = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
};

// Add user to the tabel
export const addUserToUserTable = async (userData) => {
  return await prisma.user.create({
    data: {
      ...userData,
    },
  });
};

// Post a job for review
export const postAJobForReview = async (jobData) => {
  return await prisma.job.create({
    data: {
      ...jobData,
    },
  });
};

// Publish a linkpost
export const publishAPost = async (linkPostData) => {
  return await prisma.linkPost.create({
    data: {
      ...linkPostData,
    },
  });
};

// Publish a ask post
export const publishAskPostData = async (askPostData) => {
  return await prisma.ask.create({
    data: {
      ...askPostData,
    },
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

// Publish a tag
export const publishATag = async (tagData) => {
  return await prisma.tag.create({
    data: {
      ...tagData,
    },
  });
};

// Publish a linkpost tag
export const publishALinkPostTag = async (linkPostTag) => {
  return await prisma.linkPostTags.create({
    data: {
      ...linkPostTag,
    },
  });
};

// Publish a ask post tag
export const publishAskPostTag = async (askPostTag) => {
  return await prisma.askTags.create({
    data: {
      ...askPostTag,
    },
  });
};

// Get a job by ID
export const getAJobByID = async (jobId) => {
  return await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
};

// Get all user posts with pagination
export const getAllUserLinkPosts = async (userId, sortBy, page) => {
  // Sorting by date
  if (sortBy == "date") {
    return await prisma.linkPost.findMany({
      where: { userId },
      skip: NO_OF_POSTS_PER_PAGE * (page - 1),
      take: NO_OF_POSTS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return await prisma.linkPost.findMany({
    where: { userId },
    take: NO_OF_POSTS_PER_PAGE * page,
  });
};

// Get all user posts with pagination
export const getAllUserAskposts = async (userId, sortBy, page) => {
  // Sorting by date
  if (sortBy == "date") {
    return await prisma.ask.findMany({
      where: { userId },
      skip: NO_OF_POSTS_PER_PAGE * (page - 1),
      take: NO_OF_POSTS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return await prisma.linkPost.findMany({
    where: { userId },
    take: NO_OF_POSTS_PER_PAGE * page,
  });
};

// Get link post by post ID
export const getLinkPostById = async (postId) => {
  return await prisma.linkPost.findUnique({
    where: {
      id: postId,
    },
  });
};

// Get user data
export const getUserData = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

// Get user name
export const getUserName = async (userId) => {
  const { name } = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });

  return name;
};
