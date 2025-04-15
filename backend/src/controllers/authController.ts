import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

export const AuthController = {
  // Register a new user
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Check if user already exists
      const existingEmail = await UserModel.findByEmail(email);
      if (existingEmail) {
        res.status(400).json({ message: 'Email already in use' });
        return;
      }

      const existingUsername = await UserModel.findByUsername(username);
      if (existingUsername) {
        res.status(400).json({ message: 'Username already taken' });
        return;
      }

      // Create user
      const newUser = await UserModel.create({ username, email, password });

      // Generate JWT
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1h' }
      );

      res.status(201).json({ token, user: { id: newUser.id, username, email } });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Login user
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1h' }
      );

      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  // Get current user profile
  getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      // Use req.user from middleware
      const user = await UserModel.findByEmail((req as any).user.email);
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({ message: 'Server error retrieving profile' });
    }
  }
};