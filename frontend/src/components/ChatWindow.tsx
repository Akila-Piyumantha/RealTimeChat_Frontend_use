"use client";

import React, { useState } from "react";

const ChatWindow: React.FC = () => {
  // Define messages inline
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "me"; timestamp: string }[]
  >([
    { id: 1, text: "Hello", sender: "user", timestamp: "9:30 AM" },
    { id: 2, text: "How are you?", sender: "user", timestamp: "9:31 AM" },

  ]);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (e.key === "Enter" && input.value.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages([
        ...messages,
        { id: Date.now(), text: input.value, sender: "me", timestamp },
      ]);
      input.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 my-2 rounded-lg max-w-xs ${
              msg.sender === "me"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-gray-900 self-start"
            }`}
          >
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-gray-600 mt-1 text-right">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <input
        type="text"
        className="p-3 border-t border-gray-300 focus:outline-none"
        placeholder="Type a message..."
        onKeyDown={sendMessage}
      />
    </div>
  );
};

export default ChatWindow;
