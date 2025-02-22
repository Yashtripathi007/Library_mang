import { useState, useEffect } from "react";
import {
  BookIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { addBook, getAllBooks } from "../backend/book";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    author: "",
    category: "",
    isbn: "",
  });

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const books = await getAllBooks();
        setBooks(
          books.map((book, idx) => ({
            id: idx + 1,
            title: book.title,
            author: book.author,
            category: book.category,
            isbn: book.isbn,
            status: book.status,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBooks();
  });

  const openModal = (book = null) => {
    setFormData(
      book || { id: null, title: "", author: "", category: "", isbn: "" }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.category ||
      !formData.isbn
    ) {
      alert("All fields are required!");
      return;
    }

    if (formData.id) {
      // Update Book
      setBooks((prev) =>
        prev.map((b) => (b.id === formData.id ? formData : b))
      );
    } else {
      // Add New Book
      setBooks((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
    }
    try {
      await addBook(
        formData.title,
        formData.author,
        formData.category,
        formData.isbn
      );
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Book Management</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 pl-10 pr-3"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
          onClick={() => openModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="mr-2" />
          Add Book
        </button>
      </div>

      {/* Book Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Books List</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">ISBN</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books
              .filter((b) =>
                b.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((book) => (
                <tr key={book.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {book.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.author}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.isbn}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(book)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {formData.id ? "Edit Book" : "Add New Book"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  ISBN *
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
