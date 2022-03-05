export const respondSuccess = async (res, statusCode, title, message, data) => {
  res.status(statusCode).send({
    title,
    message,
    data,
  });
};

export const respondError = async (
  res,
  statusCode,
  title,
  message,
  data = {}
) =>
  res.status(statusCode).send({
    title,
    message,
    data,
  });

export const respondValidationError = async (
  res,
  data
) => {
  res.status(422).send(data);
};


export const respondCustomSuccess = async (
  res,
  data
) => {
  res.status(200).send(data);
};

export const respondObjectNotFound = async (
  res,
  data
) => {
  res.status(404).send(
    {
      message: "Object not found",
      details: data
    }
  );
};

export const respondUnauthorized = async (
  res,
  data
) => {
  res.status(401).send(
    {
      message: "Authentication failed",
      details: data
    }
  );
};

export const respondNotAllowed = async (
  res,
  data
) => {
  res.status(403).send(
    {
      message: "Not allowed",
      details: data
    }
  );
};

export const respondPaymentRequestSuccess = async (
  res,
  statusCode,
  message,
  remarks,
  warnings,
  paymentRequest
) => {
  res.status(statusCode).send({
    message,
    remarks,
    warnings,
    paymentRequest,
  });
};

export const respondApiError = async (res, statusCode, message) =>
  res.status(statusCode).send({
    message,
  });

export const respondApiSuccess = async (res, statusCode, message, data) => {
  res.status(statusCode).send({
    message,
    data,
  });
};

export const respondApiErrorByProductField = async (res, statusCode, message, details) =>
  res.status(statusCode).send({
    message,
    details
  });

export const respondSuccessWithWarning = async (
  res,
  statusCode,
  title,
  message,
  warnings,
  data
) => {
  res.status(statusCode).send({
    title,
    message,
    warnings,
    data,
  });
};