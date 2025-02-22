import api from "./api";

// Add a New Book (Admin Only)
export const addBook = async (title, author, category, isbn) => {
  try {
    const response = await api.post("/book/add", {
      title,
      author,
      category,
      isbn,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add book!";
  }
};

// Get All Books (Public)
export const getAllBooks = async () => {
  try {
    const response = await api.get("/book/getAllBooks");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch books!";
  }
};

export const issueBook = async (bookId, issuedDate, returnDate) => {
  try {
    const response = await api.post("/book/issue", {
      bookId,
      issuedDate,
      returnDate,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to issue book!";
  }
};
