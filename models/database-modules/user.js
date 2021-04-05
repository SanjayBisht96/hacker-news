import { PrismaClient } from "@prisma/client";
import AppErrors from "../../api-utils/errors";

const prisma = new PrismaClient();
const errorMessage = new AppErrors();

class UserDatabseModule {
  // Check if username already exists
  userDataIfExists = async (userName) => {
    return await prisma.user
      .findFirst({
        where: {
          userName,
        },
      })
      .then((userData) => {
        return userData;
      });
  };

  // Add user to the tabel
  addUserToUserTable = async (userData) => {
    return await prisma.user
      .create({
        data: {
          ...userData,
        },
      })
      .then((userData) => {
        return {
          name: userData.name,
          email: userData.email,
          imageUrl: userData.imageUrl,
          accessToken: userData.accessToken,
        };
      });
  };

  // Post a job for review
  postAJobForReview = async (jobData) => {
    return await prisma.job
      .create({
        data: {
          ...jobData,
        },
      })
      .then((jobData) => {
        return {
          mainText: jobData.mainText,
          hyperLink: jobData.hyperLink,
          isActive: jobData.isActive,
          postedOn: jobData.postedOn,
        };
      });
  };
}

export default UserDatabseModule;
