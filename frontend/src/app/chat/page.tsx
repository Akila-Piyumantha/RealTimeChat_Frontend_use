import React from "react";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";


const ChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Section */}
      <div className="flex flex-col flex-grow">
        <header className="bg-gray-800 text-white py-4 px-6 text-center">
          Chat with Darshan
        </header>
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
