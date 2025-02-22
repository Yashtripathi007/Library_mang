import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Book category is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is required"],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Issued"],
      default: "Available",
    },
    issuedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Null means the book is not issued
    },
    issuedDate: {
      type: Date,
      default: null, // Null means the book is not issued
    },
    returnDate: {
      type: Date,
      default: null, // Null means the book is not issued
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
