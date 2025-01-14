import React from "react";

const Sidebar: React.FC = () => {
  const contacts = ["Test", "Test", "Test", "Test"];

  return (
    <div className="w-1/4 bg-gray-900 text-white p-4">
      <h3 className="text-lg font-semibold mb-4">Messages</h3>
      <ul className="space-y-3">
        {contacts.map((contact, index) => (
          <li key={index} className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer">
            {contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
