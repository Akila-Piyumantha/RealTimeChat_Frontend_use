"use client";

import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Button } from "./ui/button";

const ChatWindow: React.FC = () => {
  // Define messages inline
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "me"; timestamp: string }[]
  >([
    { id: 1, text: "Hello", sender: "user", timestamp: "9:30 AM" },
    { id: 2, text: "How are you?", sender: "me", timestamp: "9:31 AM" },
   
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
    <div className="flex flex-col font-title h-full bg-primary">
      {/* Chat Area */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 my-2 rounded-lg max-w-xs ${
              msg.sender === "me"
                ? "bg-background text-accent self-end"
                : "bg-background text-white self-start"
            }`}
          >
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-gray-500 mt-1 text-right">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t border-accent bg-background p-3">
      <input
        type="text"
        className="flex-1 p-1 bg-transparent text-white focus:outline-none"
        placeholder="Type a message..."
        onKeyDown={sendMessage}
      />
      <Button 
        className="ml-2 p-3 bg-primary text-accent hover:bg-opacity-80 transition"
      >
        <IoMdSend size={24} />
      </Button>
    </div>
    </div>
  );
};

export default ChatWindow;
