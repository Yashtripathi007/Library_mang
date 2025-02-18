import mongoose from "mongoose";

console.log(process.env.MONGO_URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Library_management",
    });
    console.log("MongoDB connected..............");
  } catch (error) {
    console.log(error);
  }
};
