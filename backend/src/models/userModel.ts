import { dbConnection } from '../config/database';
import bcrypt from 'bcryptjs';

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
}

export const UserModel = {
  // Find user by email
  findByEmail: (email: string): Promise<User | null> => {
   return new Promise((resolve, reject) => {
    dbConnection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, results: any) => {
       if (err) return reject(err);
       if (results.length === 0) return resolve(null);
       return resolve(results[0]);
      }
    );
   });
  },

  // Find user by username
  findByUsername: (username: string): Promise<User | null> => {
   return new Promise((resolve, reject) => {
    dbConnection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, results: any) => {
       if (err) return reject(err);
       if (results.length === 0) return resolve(null);
       return resolve(results[0]);
      }
    );
   });
  },

  // Create new user
  create: async (userData: User): Promise<User> => {
   // Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(userData.password, salt);

   return new Promise((resolve, reject) => {
    dbConnection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [userData.username, userData.email, hashedPassword],
      (err, result: any) => {
       if (err) return reject(err);
       
       // Return created user (without password)
       const newUser = {
        id: result.insertId,
        username: userData.username,
        email: userData.email,
        password: '',
        created_at: new Date()
       };
       
       return resolve(newUser);
      }
    );
   });
  }
};