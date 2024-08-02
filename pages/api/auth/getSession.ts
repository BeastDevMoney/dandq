import { NextApiRequest } from 'next';
import { Session } from '../schemas/sessionCollection';

export async function getSession(req: NextApiRequest) {
  const token = req.cookies.auth;

  if (!token) {
    return null;
  }

  try {
    const session = await Session.findOne({ token }).populate('userId');
    if (!session) {
      return null;
    }

    return {
      userId: session.userId._id,
      username: session.userId.username
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}