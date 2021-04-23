import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { getAllPostsDataWithPagination } from "database-utils/global";
import moment from "moment";

const getUserData = async (req, res) => {
};

const publishGetUserDataHandler = nc().get(getUserData);

export default publishGetUserDataHandler;
