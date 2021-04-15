class SendResponse {
  constructor() {
    this.envStatus = process.env.ENV;
  }

  // Send success response
  sendSuccessResponse({
    res,
    status = "Success",
    statusCode = 200,
    message,
    payload,
  }) {
    res.status(statusCode).json({
      status,
      message,
      payload,
    });
  }

  // Send error response
  sendErrorResponse({
    res,
    status = "Failed",
    statusCode = 400,
    error,
  }) {
    res.status(statusCode).json({
      status,
      error,
    });
  }
}

export default SendResponse;
