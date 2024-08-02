import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  lastInteraction: {
    type: Date,
    default: Date.now
  },
  interactedToday: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  objectives: [{
    id: Number,
    text: String
  }]
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);