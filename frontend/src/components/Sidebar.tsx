"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CiLock } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService, userService } from "@/services/api";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

const Sidebar: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await userService.getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/sign-in";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-1/4 font-title bg-secondary text-white p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-title font-semibold">Chats</h3>
        <Button
          onClick={() => router.push('/find-users')}
          className="bg-accent text-white rounded-full p-2 h-9 w-9 flex items-center justify-center hover:bg-opacity-80"
        >
          <FaUserPlus size={15} />
        </Button>
      </div>

      {/* Search Box */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <IoSearchOutline className="text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search contacts..."
          className="w-full pl-10 py-2 text-white bg-background border border-background rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          {searchTerm ? "No contacts found" : "No contacts yet"}
          {!searchTerm && (
            <div className="mt-2">
              <Button
                onClick={() => router.push('/find-users')}
                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-opacity-80"
              >
                Find Users
              </Button>
            </div>
          )}
        </div>
      ) : (
        <ul className="overflow-y-auto flex-grow">
          {filteredContacts.map((contact) => {
            const isActive = pathname.includes(`/chat/${contact.id}`);

            return (
              <Link href={`/chat/${contact.id}`} key={contact.id}>
                <li
                  className={`flex items-center p-3 mb-2 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors ${isActive ? "bg-accent/30" : ""
                    }`}
                >
                  <div className="relative">
                    <Avatar className="mr-3 h-10 w-10">
                      {contact.avatar ? (
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                      ) : (
                        <AvatarFallback className="bg-accent/50 text-white">
                          {getInitials(contact.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {contact.isOnline && (
                      <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 border-2 border-secondary rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">{contact.name}</span>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-400">{contact.lastMessageTime}</span>
                      )}
                    </div>

                    {contact.lastMessage && (
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400 truncate pr-2">
                          {contact.lastMessage}
                        </p>
                        {contact.unreadCount && contact.unreadCount > 0 ? (
                          <span className="bg-accent text-white rounded-full text-xs flex items-center justify-center min-w-5 h-5 px-1">
                            {contact.unreadCount}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      )}

      {/* Bottom User Info */}
      <div className="bg-background text-white flex items-center p-3 mt-2 rounded-lg">
        <Avatar className="mr-3 h-10 w-10">
          {currentUser?.avatar ? (
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          ) : (
            <AvatarFallback className="bg-accent/50 text-white">
              {currentUser ? getInitials(currentUser.name) : "U"}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="font-medium truncate">{currentUser?.name || "User"}</span>
        <div className="text-lg ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-accent/20">
            <Link href="/security">
              <CiLock size={20} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-accent/20">
            <Link href="/settings">
              <IoIosSettings size={20} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-accent/20" onClick={handleLogout}>
            <RiLogoutCircleLine size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;