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
        
        delete userData.password;
        delete userData.joinedOn;

        return userData;
      });
  };
}

export default UserDatabseModule;

// // Update user token when sign in
// export const updateUserTokensWhenSignIn = async ({
//   accessToken,
//   refreshToken,
//   userId,
//   userName,
// }) => {
//   return new Promise((resolve, reject) => {
//     DB.query(
//       `UPDATE users SET accessToken = ?, refreshToken = ? WHERE userID = ?`,
//       [accessToken, refreshToken, userId],
//       (error) => {
//         if (error) {
//           reject(new Error(errorMessage.createUserErorrMessage(error)));
//         }

//         resolve({
//           userId: userId,
//           userName: userName,
//           accessToken: accessToken,
//           refreshToken: refreshToken,
//         });
//       }
//     );
//   });
// };
