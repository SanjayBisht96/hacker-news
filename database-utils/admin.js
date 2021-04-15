import { PrismaClient } from "@prisma/client";
import { encryptData } from "api-utils/auth";

const prisma = new PrismaClient();

// Check if adminname already exists
export const adminDataIfExists = async (email) => {
  return await prisma.admin
    .findFirst({
      where: {
        email,
      },
    })
    .then((adminData) => {
      return adminData;
    });
};

// Add admin to the tabel
export const addAdminToAdminTable = async (adminData) => {
  return await prisma.admin
    .create({
      data: {
        ...adminData,
      },
    })
    .then((adminData) => {
      const hasedId = encryptData(adminData.id);

      return {
        id: hasedId,
      };
    });
};
