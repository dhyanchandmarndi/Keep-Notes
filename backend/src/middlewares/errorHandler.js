// middlewares/errorHandler.js

// 404 handler (for unknown routes)
export function notFound(req, res, next) {
  res.status(404).json({
    error: true,
    message: `Route not found: ${req.originalUrl}`,
  });
}

// Central error handler
export function errorHandler(err, req, res, next) {
  console.error("Error 💥:", err);

  // If you ever throw custom errors with statusCode, respect it
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    error: true,
    message: err.message || "Something went wrong. Please try again later.",
  });
}
