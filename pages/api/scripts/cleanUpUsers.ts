import cron from 'node-cron';
import { connectDB_MVP } from '../db/db';
import { User } from '../schemas/userSchema';
import { Session } from '../schemas/sessionCollection';

async function cleanupUsers() {
  await connectDB_MVP();

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Find users who haven't interacted in the last 24 hours
  const inactiveUsers = await User.find({
    $or: [
      { lastInteraction: { $lt: twentyFourHoursAgo } },
      { interactedToday: false }
    ]
  });

  for (const user of inactiveUsers) {
    if (user.interactedToday === false) {
      // Delete user and their sessions
      await Session.deleteMany({ userId: user._id });
      await User.findByIdAndDelete(user._id);
    } else {
      // Reset interactedToday to false
      user.interactedToday = false;
      await user.save();
    }
  }

}

// Run the cleanup task every day at midnight
cron.schedule('0 0 * * *', cleanupUsers);