import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB_MVP } from '../db/db';
import { User } from '../schemas/userSchema';
import { Session } from '../schemas/sessionCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { auth } = req.cookies;

    if (!auth) {
      return res.status(401).json({ authenticated: false });
    }

    try {
      await connectDB_MVP();

      // Find the session
      const session = await Session.findOne({ token: auth });

      if (!session) {
        return res.status(401).json({ authenticated: false });
      }

      // Find the user
      const user = await User.findById(session.userId);

      if (!user) {
        return res.status(401).json({ authenticated: false });
      }

      // Check if the user has interacted today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (user.lastInteraction < today) {
        user.interactedToday = false;
        await user.save();
      }

      res.status(200).json({ 
        authenticated: true, 
        username: user.username,
        interactedToday: user.interactedToday
      });

    } catch (error) {
      console.error('Error checking authentication:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}