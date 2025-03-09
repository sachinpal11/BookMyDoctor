import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log("MONGO_URI", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    })
    connection.on("error", (err) => {
      console.log("MongoDB connection error: ", err);
      process.exit(1);
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);

  }
};

export default connectDB;