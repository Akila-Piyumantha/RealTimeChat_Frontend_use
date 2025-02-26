"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { Button } from "./ui/button";
import { authService, chatService } from "@/services/api";
import { useParams } from "next/navigation";
import io from "socket.io-client";

interface Message {
  id: string;
  text: string;
  sender: string;
  receiver: string;
  timestamp: string;
  seen: boolean;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { contactId } = useParams();
  const currentUser = authService.getCurrentUser();
  const socketRef = useRef<any>(null);

  // Connect to socket when component mounts
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000");

    // Notify server that user is online
    socketRef.current.emit("userOnline", currentUser?.id);

    socketRef.current.on("receiveMessage", (message: Message) => {
      if (
        (message.sender === currentUser?.id && message.receiver === contactId) ||
        (message.sender === contactId && message.receiver === currentUser?.id)
      ) {
        setMessages((prev) => [...prev, message]);

        if (message.sender === contactId && message.receiver === currentUser?.id) {
          chatService.markMessageAsSeen(message.id);
        }
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [contactId, currentUser]);

  // Fetch conversation history
  useEffect(() => {
    const fetchMessages = async () => {
      if (!contactId || !currentUser) return;

      try {
        setLoading(true);
        const data = await chatService.getMessages(currentUser.id, contactId);
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [contactId, currentUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !contactId || !currentUser) return;

    const timestamp = new Date().toISOString();

    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: currentUser.id,
      receiver: contactId,
      timestamp,
      seen: false,
    };

    try {
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");

      await chatService.sendMessage({
        sender: currentUser.id,
        receiver: contactId,
        text: inputMessage
      });

      socketRef.current.emit("sendMessage", newMessage);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupedMessages = messages.reduce((groups: Record<string, Message[]>, message) => {
    const date = formatMessageDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex flex-col font-title h-full bg-primary">
      {/* Chat Area */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-400">
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="mb-4">
              <div className="flex justify-center">
                <span className="bg-accent px-2 py-1 rounded-full text-xs text-white mb-2">
                  {date}
                </span>
              </div>
              {dateMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 my-2 rounded-lg max-w-xs ${msg.sender === currentUser?.id
                    ? "bg-accent text-white self-end ml-auto"
                    : "bg-background text-white self-start"
                    }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className="flex justify-end items-center gap-1 text-xs text-gray-300 mt-1">
                    <span>{formatMessageTime(msg.timestamp)}</span>
                    {msg.sender === currentUser?.id && (
                      <span>
                        {msg.seen ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                          >
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;