import { PrismaClient } from "@prisma/client";
import AppErrors from "api-utils/errors";
import { encryptData } from "api-utils/auth";

const prisma = new PrismaClient();
const errorMessage = new AppErrors();

// Check if username already exists
export const userDataIfExists = async (email) => {
  return await prisma.user
    .findFirst({
      where: {
        email,
      },
    })
    .then((userData) => {
      return userData;
    });
};

// Add user to the tabel
export const addUserToUserTable = async (userData) => {
  return await prisma.user
    .create({
      data: {
        ...userData,
      },
    })
    .then((userData) => {
      const hasedId = encryptData(userData.id);

      return {
        id: hasedId,
      };
    });
};

// Post a job for review
export const postAJobForReview = async (jobData) => {
  return await prisma.job
    .create({
      data: {
        ...jobData,
      },
    })
    .then((jobData) => {
      return jobData;
    });
};

// Get a job by ID
export const getAJobByID = async (jobId) => {
  return await prisma.job
    .findUnique({
      where: {
        id: jobId,
      },
    })
    .then((jobData) => {
      return jobData;
    });
};