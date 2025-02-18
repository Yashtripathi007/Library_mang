import { useState } from "react";
import { UsersIcon, EditIcon, TrashIcon, PlusIcon, SearchIcon } from "lucide-react";

const MembershipManagement = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "Alice Smith", email: "alice@example.com", duration: "6 months", status: "Active" },
    { id: 2, name: "Bob Johnson", email: "bob@example.com", duration: "1 year", status: "Active" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    duration: "6 months",
    status: "Active",
  });

  const openModal = (member = null) => {
    setFormData(member || { id: null, name: "", email: "", duration: "6 months", status: "Active" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("All fields are required!");
      return;
    }

    if (formData.id) {
      // Update Membership
      setMembers((prev) => prev.map((m) => (m.id === formData.id ? formData : m)));
    } else {
      // Add New Membership
      setMembers((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this membership?")) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Membership Management</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search members..."
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
          Add Membership
        </button>
      </div>

      {/* Membership Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Membership List</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members
              .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((member) => (
                <tr key={member.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{member.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.duration}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.status}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(member)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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

      {/* Add/Edit Membership Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {formData.id ? "Edit Membership" : "Add New Membership"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Duration *</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                >
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="bg-gray-400 px-4 py-2 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
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

export default MembershipManagement;
