// import express from 'express';
// import User from '../models/User';
// import bcrypt from 'bcryptjs';

// const router = express.Router();

// // Register endpoint (for initial setup, can be removed later)
// router.post('/register', async (req, res) => {
//   const { username, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = new User({ username, password: hashedPassword, role });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log(err.message); // OK
//     } else {
//       console.log('Unknown error', err);
//     }
//   }
// });

// // Login endpoint
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//   // For demo: return user info (in production, use JWT!)
//   res.json({ username: user.username, role: user.role });
// });

// export default router;

import express, { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const router: Router = express.Router();

// Generic async handler for Express routes
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);


  
// Register endpoint
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Hash password before saving in production!
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  });
// Login endpoint
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ username: user.username, role: user.role });
  })
);

export default router;