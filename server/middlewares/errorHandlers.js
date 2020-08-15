const { formatResponse } = require("../library/formatResponse");

exports.notfound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} requested path doesn't exists `);
  res.status(404);
  next(error);
};
exports.handleError = (error, req, res, next) => {
  const statusCode = res.status === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ message: error.message, stack: error.stack });
};
