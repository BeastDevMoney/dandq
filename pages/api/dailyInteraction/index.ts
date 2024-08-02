import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB_MVP } from '../db/db';
import { User } from '../schemas/userSchema';
import { Session } from '../schemas/sessionCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDB_MVP();
      
      const token = req.cookies.auth;
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const session = await Session.findOne({ token });
      if (!session) {
        return res.status(401).json({ message: 'Invalid session' });
      }

      const user = await User.findById(session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.lastInteraction = new Date();
      user.interactedToday = true;
      await user.save();

      res.status(200).json({ message: 'Daily interaction recorded' });
    } catch (error) {
      console.error('Error during daily interaction:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}