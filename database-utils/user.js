import { PrismaClient } from "@prisma/client";

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

// Get a job by ID
export const getAJobByID = async (jobId) => {
  return await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
};

// Get all user posts with pagination
export const getAllPostsDataWithPagination = async () => {
  return await prisma.linkPost.findMany({
    take: 20,
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
