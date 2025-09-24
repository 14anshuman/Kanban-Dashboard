import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new ApiError(500, 'Server error: JWT secret not configured.');
      }

      const decoded = jwt.verify(token, jwtSecret);
      req.user = { id: decoded.id }; // attach user to request
      return next();
    } catch (error) {
      console.error(error);
      return next(new ApiError(401, 'Not authorized, token failed'));
    }
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized, no token'));
  }
};
