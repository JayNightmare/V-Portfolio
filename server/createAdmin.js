import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  const args = process.argv.slice(2);
  const username = args[0];
  const password = args[1];

  if (!username || !password) {
    console.error('Usage: npm run create-admin <username> <password>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('User already exists');
      process.exit(1);
    }

    const user = new User({ username, password });
    await user.save();
    
    console.log(`Admin user '${username}' created successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
