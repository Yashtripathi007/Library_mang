import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";

dotenv.config({
  path: "./src/config/.env",
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Library_management",
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Seed Users
const seedUsers = async () => {
  try {
    await connectDB();

    // Remove all users (optional)
    await User.deleteMany({});
    console.log("⚠️ Existing Users Removed!");

    // Hash passwords
    const adminPassword = await bcrypt.hash("adminpassword", 10);
    const userPassword = await bcrypt.hash("userpassword", 10);

    // Define users
    const users = [
      {
        name: "Admin User",
        username: "adminuser",
        email: "admin@example.com",
        password: adminPassword,
        role: "Admin",
      },
      {
        name: "User One",
        username: "userone",
        email: "userone@example.com",
        password: userPassword,
        role: "User",
      },
      {
        name: "User Two",
        username: "usertwo",
        email: "usertwo@example.com",
        password: userPassword,
        role: "User",
      },
    ];

    // Insert users into database
    await User.insertMany(users);
    console.log("✅ Admin & Users Created!");

    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    console.error("❌ Error Seeding Users:", error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
