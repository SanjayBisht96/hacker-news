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
