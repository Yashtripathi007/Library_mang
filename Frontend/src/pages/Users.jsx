import { useState, useEffect } from "react";
import {
  UserIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
} from "lucide-react";
import { registerUser } from "../backend/auth";
import { getAllUsers } from "../backend/user";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let allUsers = await getAllUsers();
        setUsers(
          allUsers.data.map((user, idx) => ({
            id: idx + 1,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
          }))
        );
      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    setError("");
    setShowPassword(false);
    setFormData(
      user || {
        id: null,
        name: "",
        username: "",
        email: "",
        password: "",
        role: "User",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.id && !formData.password.trim()) {
      setError("Password is required for new users");
      return false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (formData.id) {
        setUsers((prev) =>
          prev.map((u) => (u.id === formData.id ? formData : u))
        );
      } else {
        setUsers((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
      }

      await registerUser(
        formData.name,
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );

      closeModal();
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
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
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Users List</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((u) =>
                u.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {formData.id ? "Edit User" : "Add New User"}
            </h3>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center mb-4">
                <AlertCircleIcon className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  {formData.id
                    ? "Password (leave blank to keep unchanged)"
                    : "Password *"}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full py-2 px-3 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
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

export default UserManagement;
