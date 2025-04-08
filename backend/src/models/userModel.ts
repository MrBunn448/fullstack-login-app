// Import database connection from config file
import { dbConnection } from '../config/database';
// Import bcrypt for password hashing and security
import bcrypt from 'bcryptjs';

/**
 * User interface defining the structure of user objects
 * Optional properties marked with ? are not required when creating a new user
 */
interface User {
  id?: number;          // Unique user ID (optional as it's auto-generated)
  username: string;     // User's display name
  email: string;        // User's email address
  password: string;     // User's password (will be hashed before storage)
  created_at?: Date;    // Timestamp when user was created (optional)
}

/**
 * UserModel object containing user-related database operations
 */
export const UserModel = {
  /**
   * Find a user by their email address
   * @param email - The email to search for
   * @returns Promise resolving to User object or null if not found
   */
  findByEmail: (email: string): Promise<User | null> => {
   return new Promise((resolve, reject) => {
    // Execute SQL query to find user by email
    dbConnection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],  // Parameter is passed separately to prevent SQL injection
      (err, results: any) => {
       if (err) return reject(err);  // Return error if query fails
       if (results.length === 0) return resolve(null);  // Return null if no user found
       return resolve(results[0]);  // Return the first (and should be only) matching user
      }
    );
   });
  },

  /**
   * Find a user by their username
   * @param username - The username to search for
   * @returns Promise resolving to User object or null if not found
   */
  findByUsername: (username: string): Promise<User | null> => {
   return new Promise((resolve, reject) => {
    // Execute SQL query to find user by username
    dbConnection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],  // Parameter is passed separately to prevent SQL injection
      (err, results: any) => {
       if (err) return reject(err);  // Return error if query fails
       if (results.length === 0) return resolve(null);  // Return null if no user found
       return resolve(results[0]);  // Return the first (and should be only) matching user
      }
    );
   });
  },

  /**
   * Create a new user in the database
   * @param userData - User data including username, email and password
   * @returns Promise resolving to created User object (without password)
   */
  create: async (userData: User): Promise<User> => {
   // Hash password for security before storing
   const salt = await bcrypt.genSalt(10);  // Generate a salt for password hashing
   const hashedPassword = await bcrypt.hash(userData.password, salt);  // Create secure hash

   return new Promise((resolve, reject) => {
    // Execute SQL query to insert new user
    dbConnection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [userData.username, userData.email, hashedPassword],  // Use hashed password
      (err, result: any) => {
       if (err) return reject(err);  // Return error if query fails
       
       // Create user object to return (excluding password for security)
       const newUser = {
        id: result.insertId,  // Use ID generated by database
        username: userData.username,
        email: userData.email,
        password: '',  // Don't return the password
        created_at: new Date()  // Set creation timestamp
       };
       
       return resolve(newUser);  // Return the created user
      }
    );
   });
  }
};