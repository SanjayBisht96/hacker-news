import { PrismaClient } from "@prisma/client";
import AppErrors from "../../api-utils/errors";

const prisma = new PrismaClient();
const errorMessage = new AppErrors();

class AdminDatabseModule {
  // Check if adminname already exists
  adminDataIfExists = async (adminName) => {
    return await prisma.admin
      .findFirst({
        where: {
          adminName,
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
        return {
          id: adminData.id,
          adminName: adminData.adminName,
        };
      });
  };
}

export default AdminDatabseModule;
