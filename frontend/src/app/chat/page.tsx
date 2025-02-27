"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { useParams, useRouter } from "next/navigation";
import { authService, userService } from "@/services/api";
import LoadingScreen from "@/components/LoadingScreen";

const ChatPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contactName, setContactName] = useState<string>("");
  const { contactId } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      setLoading(true);

      if (!authService.isAuthenticated()) {
        router.push("/sign-in");
        return;
      }

      // If on the chat page with no specific contact, redirect to first contact
      if (!contactId) {
        try {
          const contacts = await userService.getContacts();
          if (contacts && contacts.length > 0) {
            router.push(`/chat/${contacts[0].id}`);
          }
        } catch (error) {
          console.error("Failed to fetch contacts:", error);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // Fetch contact name when contactId changes
  useEffect(() => {
    const fetchContactName = async () => {
      if (contactId) {
        try {
          const user = await userService.getUserProfile(contactId as string);
          setContactName(user.name);
        } catch (error) {
          console.error("Failed to fetch contact details:", error);
        }
      }
    };

    fetchContactName();
  }, [contactId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Section */}
      {contactId ? (
        <div className="flex flex-col flex-grow font-title">
          <header className="bg-secondary text-white py-3 px-6 flex items-center">
            <div className="font-medium text-lg">{contactName || "Chat"}</div>
          </header>
          <ChatWindow />
        </div>
      ) : (
        <div className="flex flex-col flex-grow font-title justify-center items-center bg-primary text-white">
          <div className="text-2xl mb-4">Welcome to Your Chat App</div>
          <p className="text-gray-400">Select a contact to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;