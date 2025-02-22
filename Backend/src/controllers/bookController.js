import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, category, isbn } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Book with this ISBN already exists" });
    }

    const newBook = new Book({
      title,
      author,
      category,
      isbn,
      status: "Available",
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const issueBook = async (req, res) => {
  try {
    const { bookId, issuedDate, returnDate } = req.body;

    // Find the book using ID or Title
    const book = await Book.findOne({ title: bookId }); // Use findOne() instead of find()
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "Issued") {
      return res.status(400).json({ message: "This book is already issued" });
    }

    // Update book details
    book.status = "Issued";
    book.issuedTo = req.user.id;
    book.issuedDate = issuedDate;
    book.returnDate = returnDate;

    await book.save(); 
    res.status(200).json({ message: "Book issued successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
