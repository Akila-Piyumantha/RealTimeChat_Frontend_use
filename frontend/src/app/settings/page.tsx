import React from "react";

const SettingsPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">User Settings</h2>
        <input
          type="text"
          placeholder="Display Name"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
