import { useState, useEffect } from "react";
import Transactions from "./Transaction";
import Reports from "./Report";
import {
  BookOpenIcon,
  UserIcon,
  BookIcon,
  UsersIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  LogOutIcon,
  FileTextIcon,
  RepeatIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
  BellIcon,
  BarChart3Icon,
  MemoryStickIcon,
} from "lucide-react";
import BookManagement from "./Book";
import UserManagement from "./Users";
import MembershipManagement from "./Membership";
import Maintenance from "./Maintance";
import { getUser } from "../backend/auth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      if (fetchedUser === null) {
        window.location.href = "/login";
      } else {
        setUser(fetchedUser);
        setIsAuthenticated(true);
      }
    };

    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboardIcon size={20} />,
    },
    { id: "books", label: "Book Management", icon: <BookIcon size={20} /> },
    { id: "members", label: "Membership", icon: <UsersIcon size={20} /> },
    {
      id: "transactions",
      label: "Transactions",
      icon: <RepeatIcon size={20} />,
    },
    { id: "reports", label: "Reports", icon: <BarChart3Icon size={20} /> },
    {
      id: "users",
      label: "User Management",
      icon: <UserIcon size={20} />,
      adminOnly: true,
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: <Settings2Icon size={20} />,
      adminOnly: true,
    },
  ];

  const renderMainContent = () => {
    switch (activeMenuItem) {
      case "dashboard":
        return <DashboardContent />;
      case "books":
        return <BookManagement />;
      case "members":
        return <MembershipManagement />;
      case "transactions":
        return <Transactions />;
      case "reports":
        return <Reports />;
      case "users":
        return <UserManagement />;
      case "maintenance":
        return <Maintenance></Maintenance>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-800 text-white ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {isSidebarOpen && (
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8" />
              <h1 className="ml-2 text-xl font-bold">Library MS</h1>
            </div>
          )}
          {!isSidebarOpen && <BookOpenIcon className="h-8 w-8 mx-auto" />}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-blue-700"
          >
            {isSidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`flex items-center w-full p-2 rounded-md hover:bg-blue-700 ${
                    activeMenuItem === item.id ? "bg-blue-600" : ""
                  } ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full p-2 rounded-md hover:bg-blue-700 ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <LogOutIcon size={20} />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center"></div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <BellIcon size={20} className="text-gray-600" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <UserIcon size={16} />
                      </div>
                      <span className="text-sm font-medium">John Doe</span>
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a
                          href="#profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                        <a
                          href="#settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const stats = [
    {
      label: "Total Books",
      value: "3,562",
      icon: <BookIcon size={20} className="text-blue-600" />,
    },
    {
      label: "Active Members",
      value: "1,289",
      icon: <UsersIcon size={20} className="text-green-600" />,
    },
    {
      label: "Books Issued",
      value: "485",
      icon: <RepeatIcon size={20} className="text-orange-600" />,
    },
    {
      label: "Pending Returns",
      value: "87",
      icon: <FileTextIcon size={20} className="text-red-600" />,
    },
  ];

  const recentActivities = [
    {
      user: "Alice Smith",
      action: "borrowed",
      book: "To Kill a Mockingbird",
      time: "2 hours ago",
    },
    {
      user: "Bob Johnson",
      action: "returned",
      book: "The Great Gatsby",
      time: "4 hours ago",
    },
    {
      user: "Carol Lee",
      action: "renewed membership",
      book: null,
      time: "6 hours ago",
    },
    {
      user: "David Chen",
      action: "borrowed",
      book: "Pride and Prejudice",
      time: "1 day ago",
    },
    {
      user: "Emma Wilson",
      action: "returned",
      book: "1984",
      time: "1 day ago",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Activities</h3>
        </div>
        <div className="p-4">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <li key={index} className="py-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon size={16} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      {activity.book && (
                        <span className="font-medium">{activity.book}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <a
            href="#activities"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View all activities
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
