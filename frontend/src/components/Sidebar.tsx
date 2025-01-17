import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { IoIosSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Button } from "./ui/button";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const contacts = ["Test1", "Test2", "Test3"];
  const dp = ["dp.jpg", "dp.jpg", "dp.jpg"];

  return (
    <div className="w-1/4 font-sans bg-gray-900 text-white p-4 flex flex-col h-full">
    <h3 className="text-xl font-semibold mb-4">Chats</h3>
    <Input
      type="text"
      placeholder="Search"
      className="w-full mb-4 max-w-md px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg"
    />
    <ul className="">
      {contacts.map((contact, index) => (
        <li
          key={index}
          className="flex items-center p-3 border-t-2 border-gray-400 hover:bg-gray-700 cursor-pointer"
        >
          <Avatar className="mr-3">
            <AvatarImage src={dp[index]} />
          </Avatar>
          <span className="p-1">{contact}</span>
        </li>
      ))}
    </ul>
  
    {/* Bottom User Info */}
    <div className="bg-black text-white flex items-center p-3 mt-auto">
      <Avatar className="mr-3">
        <AvatarImage src="dp.jpg" />
      </Avatar>
      <span className="p-1">User</span>
      <div className="text-lg ml-auto flex items-center space-x-2">
      <Button> 
        <Link href="/settings">
        <IoIosSettings />
        </Link>
        </Button>
        <Button>
        <Link href="/sign-in">
        <RiLogoutCircleLine />
        </Link>
        </Button>
      </div>
    </div>
  </div>
  
  );
};

export default Sidebar;
