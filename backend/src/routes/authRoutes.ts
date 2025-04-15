   import express from 'express';
   import { AuthController } from '../controllers/authController';
   import { authenticateToken } from '../middleware/authMiddleware';

   const router = express.Router();

   // Register route
   router.post('/register', AuthController.register);

   // Login route
   router.post('/login', AuthController.login);//!FIX later


   // Get user profile - protected route
   router.get('/profile', authenticateToken, AuthController.getProfile); //!FIX later


   export default router;