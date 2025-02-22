import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./src/models/Book.js";

// Load environment variables
dotenv.config({
  path: "./src/config/.env",
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  dbName: "Library_management",
  useUnifiedTopology: true,
});

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "978-0743273565",
    status: "Available",
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    isbn: "978-0451524935",
    status: "Available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    isbn: "978-0061120084",
    status: "Available",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    isbn: "978-0062316097",
    status: "Available",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Classic",
    isbn: "978-0316769488",
    status: "Available",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Philosophy",
    isbn: "978-0061122415",
    status: "Available",
  },
];

const seedBooks = async () => {
  try {
    await Book.deleteMany(); // Clears existing books
    await Book.insertMany(books);
    console.log("✅ Books seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding books:", error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedBooks();
