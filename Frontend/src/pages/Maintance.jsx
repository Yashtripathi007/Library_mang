import { useState } from "react";
import { Settings2Icon, SaveIcon, RefreshCcwIcon, DatabaseIcon } from "lucide-react";

const Maintenance = () => {
  const [settings, setSettings] = useState({
    finePerDay: 5,
    membershipFee: 500,
  });

  const [backupStatus, setBackupStatus] = useState("");
  const [restoreStatus, setRestoreStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  const handleBackup = () => {
    setBackupStatus("Backup in progress...");
    setTimeout(() => {
      setBackupStatus("Backup completed successfully!");
    }, 2000);
  };

  const handleRestore = () => {
    setRestoreStatus("Restoring database...");
    setTimeout(() => {
      setRestoreStatus("Database restored successfully!");
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Settings2Icon className="mr-2" /> System Maintenance
      </h2>

      {/* System Settings */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Library Settings</h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Fine Per Day (₹)</label>
          <input
            type="number"
            name="finePerDay"
            value={settings.finePerDay}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Membership Fee (₹)</label>
          <input
            type="number"
            name="membershipFee"
            value={settings.membershipFee}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <SaveIcon className="mr-2" />
          Save Settings
        </button>
      </div>

      {/* Backup & Restore */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Database Backup & Restore</h3>

        <div className="flex space-x-4">
          <button
            onClick={handleBackup}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <DatabaseIcon className="mr-2" />
            Backup Database
          </button>

          <button
            onClick={handleRestore}
            className="bg-orange-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <RefreshCcwIcon className="mr-2" />
            Restore Database
          </button>
        </div>

        {backupStatus && <p className="mt-4 text-green-600">{backupStatus}</p>}
        {restoreStatus && <p className="mt-4 text-orange-600">{restoreStatus}</p>}
      </div>
    </div>
  );
};

export default Maintenance;
