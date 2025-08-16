const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    // eslint-disable-next-line no-console
    console.warn('MONGO_URI is not set. Set it in your .env file.');
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;


