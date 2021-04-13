import { PrismaClient } from "@prisma/client";
import AppErrors from "../../api-utils/errors";
import { encryptData } from '../../api-utils/auth';

const prisma = new PrismaClient();
const errorMessage = new AppErrors();

class AdminDatabseModule {
  // Check if adminname already exists
  adminDataIfExists = async (email) => {
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
  addAdminToAdminTable = async (adminData) => {
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
}

export default AdminDatabseModule;
