import AppErrors from "../../api-utils/errors";

const errorMessage = new AppErrors();

class UserDatabseModule {
  // Check if username already exists
  userDataIfExists = async (userName) => {
    return new Promise((resolve, reject) => {
      DB.query(
        "SELECT * FROM `users` WHERE `userName` = ?",
        [userName],
        (error, rowsOfUsersWithSameUserName) => {
          if (error) {
            reject(new Error(errorMessage.createUserErorrMessage(error)));
          }

          console.log(rowsOfUsersWithSameUserName)

          // resolve(rowsOfUsersWithSameUserName[0]);
        }
      );
    });
  };
}

export default UserDatabseModule;

// // Check if username already exists
// export const userDataIfExists = async (userName) => {
//   return new Promise((resolve, reject) => {
//     DB.query(
//       "SELECT * FROM `users` WHERE `userName` = ?",
//       [userName],
//       (error, rowsOfUsersWithSameUserName) => {
//         if (error) {
//           reject(new Error(errorMessage.createUserErorrMessage(error)));
//         }

//         resolve(rowsOfUsersWithSameUserName[0]);
//       }
//     );
//   });
// };

// // Add user to the tabel
// export const addUserToUserTable = async ({ ...user }) => {
//   return new Promise((resolve, reject) => {
//     DB.query("INSERT INTO users SET ?", user, (error) => {
//       if (error) {
//         reject(new Error(errorMessage.createUserErorrMessage(error)));
//       }

//       resolve({
//         userId: user.userId,
//         userName: user.userName,
//         accessToken: user.accessToken,
//         refreshToken: user.refreshToken,
//       });
//     });
//   });
// };

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
