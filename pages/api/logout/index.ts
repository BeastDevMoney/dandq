import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the auth cookie
    res.setHeader('Set-Cookie', serialize('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1, // Set maxAge to negative to expire the cookie immediately
      path: '/',
    }));

    // You might also want to remove the session from your database here
    // This depends on how you've set up your Session model
    // For example:
    // await Session.deleteOne({ token: req.cookies.auth });

    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}