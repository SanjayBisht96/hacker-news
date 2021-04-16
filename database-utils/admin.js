import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Check if adminname already exists
export const adminDataIfExists = async (email) => {
  return await prisma.admin.findFirst({
    where: {
      email,
    },
  });
};

// Add admin to the tabel
export const addAdminToAdminTable = async (adminData) => {
  return await prisma.admin.create({
    data: {
      ...adminData,
    },
  });
};

// Update approval status in job post
export const getAllJobPosts = async () => {
  return await prisma.job.findMany();
};

// Update approval status in job post
export const updateApprovalJobPost = async (jobId) => {
  return await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      isActive: true,
    },
  });
};

// Update rejecte status in job post
export const updateRejectJobPost = async (jobId) => {
  return await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      isRejected: true,
    },
  });
};
