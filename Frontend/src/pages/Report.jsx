import { useState } from "react";
import { FileTextIcon, CalendarIcon, SearchIcon, DownloadIcon } from "lucide-react";

const Reports = () => {
  const [activeReport, setActiveReport] = useState("issued");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const reportsData = {
    issued: [
      { id: 1, book: "To Kill a Mockingbird", user: "Alice Smith", date: "2025-02-10" },
      { id: 2, book: "1984", user: "Bob Johnson", date: "2025-02-08" },
    ],
    returned: [
      { id: 3, book: "The Great Gatsby", user: "Emma Wilson", date: "2025-02-09" },
    ],
    pending: [
      { id: 4, book: "Pride and Prejudice", user: "David Chen", dueDate: "2025-02-15" },
    ],
    fine: [
      { id: 5, user: "Charlie Brown", amount: "$5.00", date: "2025-02-07" },
    ],
    membership: [
      { id: 6, user: "Samantha Lee", type: "1 Year", status: "Active" },
    ],
  };

  const handleDownload = () => {
    alert("Report downloaded as CSV/PDF!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Library Reports</h2>

      {/* Report Tabs */}
      <div className="flex mb-6 space-x-4">
        {["issued", "returned", "pending", "fine", "membership"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md ${
              activeReport === type ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveReport(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3"
          />
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3"
          />
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 pl-10 pr-3"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          {activeReport.charAt(0).toUpperCase() + activeReport.slice(1)} Report
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              {activeReport !== "fine" && <th className="border border-gray-300 px-4 py-2">Book/User</th>}
              {activeReport === "fine" && <th className="border border-gray-300 px-4 py-2">Fine Amount</th>}
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {reportsData[activeReport].map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {activeReport !== "fine" ? item.book || item.user : item.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.date || item.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <div className="mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <DownloadIcon className="mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
