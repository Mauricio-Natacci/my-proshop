import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let mongoURI: string;
if (process.env.MONGO_URI) {
  mongoURI = process.env.MONGO_URI;
} else {
  throw new Error("mongoURI environment variable is not set");
}

const connectDB = async () => {
  try {
    // TODO: research what is object destructuring
    const { connection } = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
mongoose.set("strictQuery", true);

// TODO: remove all default exports
export default connectDB;
