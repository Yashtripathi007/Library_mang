import { useState } from "react";
import { BookIcon, CalendarIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("issue");
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    issueDate: "",
    returnDate: "",
    serialNo: "",
    finePaid: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (activeTab === "issue") {
      if (!formData.bookTitle || !formData.issueDate || !formData.returnDate) {
        setError("Please fill in all required fields.");
        return false;
      }
      if (new Date(formData.issueDate) < new Date()) {
        setError("Issue Date cannot be in the past.");
        return false;
      }
    } else if (activeTab === "return") {
      if (!formData.bookTitle || !formData.serialNo) {
        setError("Book Title and Serial Number are required.");
        return false;
      }
    } else if (activeTab === "fine" && !formData.finePaid) {
      setError("Fine must be marked as paid before proceeding.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSuccess("Transaction completed successfully.");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Library Transactions</h2>

      {/* Tabs */}
      <div className="flex mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "issue" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("issue")}
        >
          Issue Book
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "return" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("return")}
        >
          Return Book
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "fine" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("fine")}
        >
          Pay Fine
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center mb-4">
          <AlertCircleIcon className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center mb-4">
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg">
        {activeTab !== "fine" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Book Title *</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Enter book title"
              required
            />
          </div>
        )}

        {activeTab === "issue" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Issue Date *</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Return Date *</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full py-2 px-3"
                required
              />
            </div>
          </>
        )}

        {activeTab === "return" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Serial Number *</label>
              <input
                type="text"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full py-2 px-3"
                required
              />
            </div>
          </>
        )}

        {activeTab === "fine" && (
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="finePaid"
              checked={formData.finePaid}
              onChange={handleChange}
              className="h-5 w-5 mr-2"
            />
            <label className="text-gray-700 font-bold">Fine Paid</label>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          {activeTab === "issue" ? "Issue Book" : activeTab === "return" ? "Return Book" : "Pay Fine"}
        </button>
      </form>
    </div>
  );
};

export default Transactions;
