import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB_MVP } from '../db/db';
import { User } from '../schemas/userSchema';
import { getSession } from '../auth/getSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req);
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  await connectDB_MVP();
  const user = await User.findById(session.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  switch (req.method) {
    case 'GET':
      return res.status(200).json({ objectives: user.objectives || [] });

    case 'POST':
      const { objectives } = req.body;
      user.objectives = objectives;
      

       await user.save();
      

      return res.status(200).json({ message: 'Objectives saved successfully' });

    case 'DELETE':
      const { objectiveId } = req.body;
      user.objectives = user.objectives.filter((obj:any) => obj.id !== objectiveId);
      await user.save();
      return res.status(200).json({ message: 'Objective deleted successfully' });

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}