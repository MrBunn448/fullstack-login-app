
# Full-Stack React + Express Login/Register Application Setup

Welcome to this comprehensive guide on setting up a full-stack login/register application using React, Express, and MySQL. This guide is designed for beginners and covers every step in detail. Whether you're new to full-stack development or looking to enhance your skills, this tutorial will help you build a robust authentication system from scratch.

## Technologies Used in This Project

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework for Node.js
- **TypeScript** - Typed JavaScript language
- **MySQL** - Relational database
- **XAMPP/WAMP Server** - Local development environment with Apache, MySQL, PHP
- **bcryptjs** - Password hashing library
- **jsonwebtoken (JWT)** - Authentication token implementation
- **cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - For type safety
- **React Bootstrap** - UI component library
- **axios** - Promise-based HTTP client
- **react-router-dom** - Client-side routing

### Development Tools
- **npm** - Package manager
- **ts-node-dev** - TypeScript execution and development environment
- **phpMyAdmin** (via XAMPP/WAMP) - Database management tool

---

*NOTE*: This guide includes commands for both Windows and Linux.

---

Let's start with the project setup:

## Prerequisites
- Node.js (v16 or later)

  To install Node.js, go to the official website and run the installer:
  https://nodejs.org/en
  
  On Linux, you can also use:
  ```bash
  sudo apt update
  sudo apt install nodejs npm  # For Debian/Ubuntu
  ```
  
- npm (v8 or later)

  To install npm, run the following command:

  **Windows (cmd):**
  ```cmd
  npm install -g npm@latest
  ```
  
  **Linux (terminal):**
  ```bash
  sudo npm install -g npm@latest
  ```
  
- MySQL installed and running
  (This is included with XAMPP, see the following step)

## Detailed Step-by-Step Setup

### Set up XAMPP Server
1. Download XAMPP:
   - For Windows: https://www.apachefriends.org/download.html
   - For Linux: https://www.apachefriends.org/download.html (download the Linux version)

2. Install XAMPP:
   - Windows: Run the downloaded installer and follow the instructions
   - Linux:
     ```bash
     chmod +x xampp-linux-*-installer.run
     sudo ./xampp-linux-*-installer.run
     ```

3. Start XAMPP services:
   - Windows: Open XAMPP Control Panel and start Apache and MySQL
   - Linux:
     ```bash
     sudo /opt/lampp/lampp start
     ```

### 1. Create Project Directory and Initialize

**Windows (cmd):**
```bash
# Create a new directory for your project
mkdir fullstack-login-app
cd fullstack-login-app

# Create subdirectories for frontend and backend
mkdir frontend backend
```

**Linux (terminal):**
```bash
# Create a new directory for your project
mkdir fullstack-login-app
cd fullstack-login-app

# Create subdirectories for frontend and backend
mkdir -p frontend backend
```

### 2. Backend Setup

**Windows (cmd):**
```bash
# Navigate to the backend directory
cd backend

# Initialize the npm project
npm init -y

# Install core dependencies
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv

# Install TypeScript and type definitions
npm install -D typescript @types/express @types/node @types/bcryptjs @types/jsonwebtoken ts-node-dev

# Initialize TypeScript configuration
npx tsc --init
```

**Linux (terminal):**
```bash
# Navigate to the backend directory
cd backend

# Initialize the npm project
npm init -y

# Install core dependencies
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv

# Install TypeScript and type definitions
npm install -D typescript @types/express @types/node @types/bcryptjs @types/jsonwebtoken ts-node-dev

# Initialize TypeScript configuration
npx tsc --init
```

### 3. Frontend Setup

**Windows (cmd):**
```bash
# Navigate back to the project root
cd ..

# Create a React app with the TypeScript template
npx create-react-app frontend --template typescript

# Navigate to the frontend
cd frontend

# Install additional dependencies
npm install react-bootstrap bootstrap axios react-router-dom
```

**Linux (terminal):**
```bash
# Navigate back to the project root
cd ..

# Create a React app with the TypeScript template
npx create-react-app frontend --template typescript

# Navigate to the frontend
cd frontend

# Install additional dependencies
npm install react-bootstrap bootstrap axios react-router-dom
```

Next, you want to define a better folder structure. You can do this manually or just run the following command:

**Windows (PowerShell):**
```powershell
# For backend
cd backend
mkdir src, src\controllers, src\routes, src\models, src\middleware, src\config

# For frontend
cd ..\frontend
mkdir src\components, src\pages, src\services
```

**Linux (terminal):**
```bash
# For backend
cd backend
mkdir -p src/controllers src/routes src/models src/middleware src/config

# For frontend
cd ../frontend
mkdir -p src/components src/pages src/services
```

### 4. Database Preparation
For the next part, we'll use XAMPP's phpMyAdmin to set up the database.

**Windows:**
1. Open XAMPP Control Panel and start Apache and MySQL services
2. Go to `http://localhost/phpmyadmin` in your browser

**Linux:**
1. Start XAMPP services:
   ```bash
   sudo /opt/lampp/lampp start
   ```
2. Go to `http://localhost/phpmyadmin` in your browser

In phpMyAdmin:
1. Click on "New" in the left sidebar
2. Enter "login_app_db" as the database name and click "Create"
3. Select the new database and click on the "SQL" tab
4. Paste and execute the following SQL:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Recommended Project Structure
(This example is simplified and is not 100% accurate)

This is what the structure of your project should look like:
```
fullstack-login-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.tsx
    ├── package.json
    └── tsconfig.json
```

### Why This Project Structure

#### Separation of Concerns

Dividing the backend and frontend into separate directories creates a clear separation, making it easier to understand the codebase. Each part can be developed and deployed independently if needed.

#### Modularity and Maintenance

- **controllers**: Handle request processing and response generation.
- **routes**: Define API endpoints and connect them to controllers.
- **models**: Manage data structure and database interactions.
- **middleware**: Handle cross-cutting concerns like authentication.

This organized structure makes the code more maintainable as it grows.

#### Industry Standard

This structure follows conventions used in many professional Node.js/Express applications. It makes it easier for other developers to understand your codebase.

## Step-by-Step Implementation Guide for Authentication System

## 1. Database Connection Setup

### Step 1.1: Create Environment File

#### 1. Navigate to the Right Directory

Make sure you are in the project root directory, then navigate to the backend directory:

**Windows (cmd):**
```cmd
cd backend
```

**Linux (terminal):**
```bash
cd backend
```

#### 2. Create a New File

**Windows (cmd):**
```cmd
echo. > .env
```

**Linux (terminal):**
```bash
touch .env
```

#### 3. Add JWT Secret to Environment File

In the `.env` file, add the following content:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=login_app_db
JWT_SECRET=your_super_secure_jwt_secret
```

*What is a JWT secret?* [^3]

4. Replace `your_password_here` with your actual MySQL password. You can leave it empty if you don't have a password set for the root user.
5. Replace `your_super_secure_jwt_secret` with a strong random string (at least 32 characters).

### **Step 1.2: Create Database Configuration File**

#### Navigate to the project directory:

**Windows (cmd):**
```cmd
cd backend
```

**Linux (terminal):**
```bash
cd backend
```

#### Create the config directory:

**Windows (cmd):**
```cmd
mkdir src\config
```

**Linux (terminal):**
```bash
mkdir -p src/config
```

#### Navigate to the config directory and create the database.ts file:

**Windows (cmd):**
```cmd
cd src\config
echo. > database.ts
```

**Linux (terminal):**
```bash
cd src/config
touch database.ts
```

Open the file in your editor and add the following code:
```typescript
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create MySQL connection
export const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login_app_db'
});
```

## 2. User Model Creation

**Step 2.1: Create User Model**

**Windows (cmd):**
```cmd
cd backend
mkdir src\models
cd src\models
echo. > userModel.ts
```

**Linux (terminal):**
```bash
cd backend
mkdir -p src/models
cd src/models
touch userModel.ts
```

Open the file in your preferred text editor and add the following code:
```typescript
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
```

## 3. Authentication Middleware

**Step 3.1: Create Auth Middleware**

**Windows (cmd):**
```cmd
cd backend\src
mkdir middleware
echo. > middleware\authMiddleware.ts
```

**Linux (terminal):**
```bash
cd backend/src
mkdir -p middleware
touch middleware/authMiddleware.ts
```

Add the following code:
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    // Verify token
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
```

## 4. Authentication Controllers

**Step 4.1: Create Auth Controller**

**Windows (cmd):**
```cmd
cd backend\src
mkdir controllers
echo. > controllers\authController.ts
```

**Linux (terminal):**
```bash
cd backend/src
mkdir -p controllers
touch controllers/authController.ts
```

Add the following code:
```typescript
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
```

## 5. Authentication Routes

**Windows (cmd):**
```cmd
cd backend\src
mkdir routes
echo. > routes\authRoutes.ts
```

**Linux (terminal):**
```bash
cd backend/src
mkdir -p routes
touch routes/authRoutes.ts
```

Add the following code:
```typescript
import express from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Register route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);

// Get user profile - protected route
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;
```

## 6. Express Server Configuration

**Step 6.1: Create Main Server File**

**Windows (cmd):**
```cmd
cd backend\src
echo. > server.ts
```

**Linux (terminal):**
```bash
cd backend/src
touch server.ts
```

Add the following code:
```typescript
import express from 'express';
import cors from 'cors';
//npm i --save-dev @types/cors
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { dbConnection } from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Successfully connected to MySQL database');
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
```

**Step 6.2: Configure package.json for Running the Server**
1. Open the `package.json` file in your backend directory.
2. Add the following scripts:
   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/server.js",
     "dev": "ts-node-dev src/server.ts"
   }
   ```

## 7. Frontend Authentication Service

**Step 7.1: Create Auth Service**

**Windows (cmd):**
```cmd
cd frontend
mkdir src\services
echo. > src\services\authService.ts
```

**Linux (terminal):**
```bash
cd frontend
mkdir -p src/services
touch src/services/authService.ts
```

Add the following code:
```typescript
import axios from 'axios';
//run `npm install axios` to install axios

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Registration failed');
  }
};

// Login user
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Login failed');
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  return JSON.parse(userJson);
};

// Set auth header
export const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};
```

## 8. Frontend Login Component

**Step 8.1: Create Login Component**

**Windows (cmd):**
```cmd
cd frontend
mkdir src\components\auth
echo. > src\components\auth\Login.tsx
```

**Linux (terminal):**
```bash
cd frontend
mkdir -p src/components/auth
touch src/components/auth/Login.tsx
```

Add the following code:
```typescript
import React, { useState } from 'react';
//npm install react @types/react
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
//npm install react-bootstrap bootstrap @types/react-bootstrap
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Login</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              Don't have an account? <a href="/register">Register</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
```

## 9. Frontend Register Component

**Step 9.1: Create Register Component**

**Windows (cmd):**
```cmd
cd frontend\src\components\auth
echo. > Register.tsx
```

**Linux (terminal):**
```bash
cd frontend/src/components/auth
touch Register.tsx
```

Add the following code:
```typescript
import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Register</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              Already have an account? <a href="/login">Login</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
```

## 10. Frontend Dashboard Component

**Step 10.1: Create Dashboard Component**

**Windows (cmd):**
```cmd
cd frontend
mkdir src\components\dashboard
echo. > src\components\dashboard\Dashboard.tsx
```

**Linux (terminal):**
```bash
cd frontend
mkdir -p src/components/dashboard
touch src/components/dashboard/Dashboard.tsx
```

Add the following code:
```typescript
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getCurrentUser, logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser.user);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Dashboard</Card.Header>
            <Card.Body>
              <Card.Title>Welcome, {user.username}!</Card.Title>
              <Card.Text>
                You have successfully logged in to the application.
              </Card.Text>
              <div className="mt-4">
                <h6>User Information:</h6>
                <ul className="list-group">
                  <li className="list-group-item">Username: {user.username}</li>
                  <li className="list-group-item">Email: {user.email}</li>
                  <li className="list-group-item">User ID: {user.id}</li>
                </ul>
              </div>
              <Button
                variant="primary"
                onClick={handleLogout}
                className="mt-4"
              >
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
```

## 11. App Routes Configuration

**Step 11.1: Update App.tsx**
1. Open the `src/App.tsx` file in your frontend directory.

2. Replace the content with:
```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import { getCurrentUser } from './services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Container className="py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
```

**Step 11.2: Update index.css (optional)**
1. Open the `src/index.css` file.

2. Add some basic styling:
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

## 12. Setting Up the Database with XAMPP

### Database Setup with XAMPP

1. Start XAMPP:
   - **Windows**: Open XAMPP Control Panel and start Apache and MySQL services
   - **Linux**: Run `sudo /opt/lampp/lampp start`

2. Open phpMyAdmin:
   - Open your browser and navigate to `http://localhost/phpmyadmin`
   - Login (default username is usually "root" with no password)

3. Create the database:
   - Click "New" in the left sidebar
   - Enter "login_app_db" as the database name
   - Click "Create"

4. Create the users table:
   - Select the "login_app_db" database from the left sidebar
   - Select the "SQL" tab
   - Paste this code and click "Go":

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Verifying Your Setup

After running these commands, you should:

1. See `login_app_db` in the list of databases in the left sidebar of phpMyAdmin.
2. When you click on this database, you should see a `users` table.
3. Clicking on the `users` table should show its structure with the columns: id, username, email, password, and created_at.

Now you have successfully set up the database required for the login/register application.

## 13. Running the Application

**Step 13.1: Start the Backend Server**

**Windows (cmd):**
```cmd
cd backend
npm install -D ts-node-dev
npm pkg set "scripts.dev"="ts-node-dev src/server.ts"
npm run dev
```

**Linux (terminal):**
```bash
cd backend
npm install -D ts-node-dev
npm pkg set "scripts.dev"="ts-node-dev src/server.ts"
npm run dev
```

**Step 13.2: Start the Frontend Application**

**Windows (cmd):**
```cmd
cd frontend
npm start
```

**Linux (terminal):**
```bash
cd frontend
npm start
```

If you encounter permission issues on Linux when running npm commands:
```bash
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP .
```

## 14. Testing the Application

1. Open your browser and navigate to `http://localhost:3000`.
2. You should be redirected to the login page.
3. Click "Register" to create a new account.
4. After registering, you'll be redirected to the dashboard.
5. Try logging out and logging back in.
6. Try accessing the dashboard directly without logging in - you should be redirected to login.

[^1]:
Example text

[^2]: https://www.digitalcitizen.life/command-prompt-how-use-basic-commands/

[^3]: The JWT_SECRET is only needed in your server-side code via this .env file You do NOT need to configure it in phpMyAdmin or your database
This secret is used exclusively by your backend code to sign and verify authentication tokens
Make sure to use a strong, random string for better security
Never expose this secret in client-side code or commit it to public repositories

