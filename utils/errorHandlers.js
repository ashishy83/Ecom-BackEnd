const errorHandler = (err, req, res, next) => {
  let statusCode = 400;
  let msg = err instanceof Error ? err.message : "Server Error";
  next();
  res.status(statusCode).json({ error: msg });
};

module.exports = errorHandler;
