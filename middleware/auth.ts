import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from 'jsonwebtoken';

export const withAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('using authentication route')
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};