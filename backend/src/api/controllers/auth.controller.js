import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT secret is not defined.');
  return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

export const signup = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return next(new ApiError(400, 'User already exists'));
    }

    user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      message: 'User registered successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const login = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      message: 'User logged in successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

