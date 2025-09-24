
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) {
      console.error('MONGO_URI is not defined in the environment variables.');
      // FIX: Property 'exit' does not exist on type 'Process'. Replaced with throw to halt execution on critical error.
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // FIX: Property 'exit' does not exist on type 'Process'. Replaced with throw to halt execution on critical error.
    throw err;
  }
};

export default connectDB;
