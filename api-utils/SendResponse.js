// 1. Send success response
export const sendSuccessResponse = ({
  res,
  status = "Success",
  statusCode = 200,
  message,
  payload,
}) => {
  res.status(statusCode).json({
    status,
    message,
    payload,
  });
};

// Send error response
export const sendErrorResponse = ({
  res,
  status = "Failed",
  statusCode = 400,
  error,
}) => {
  res.status(statusCode).json({
    status,
    error,
  });
};
