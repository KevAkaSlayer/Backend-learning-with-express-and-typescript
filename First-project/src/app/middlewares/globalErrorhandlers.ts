
import {  Request, Response, NextFunction } from 'express'


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500; // Use a valid HTTP status code
  const message = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
}


export default globalErrorHandler