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

// Get a job by ID
export const getAJobByID = async (jobId) => {
  return await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
};
