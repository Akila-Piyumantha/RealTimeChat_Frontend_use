"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";

const SettingsPage: React.FC = () => {

  const router=useRouter();

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/chat"); 
  };

  return (
    <div className="bg-background text-white h-screen flex flex-row items-start font-body">
      <form className="bg-secondary border-primary border-2 mx-auto my-auto w-[380px] rounded-lg p-10 shadow-md space-y-4">
        <h2 className="text-2xl mb-6 font-bold text-center font-title">User Settings</h2>
        <Input
          type="text"
          placeholder="User Name"
          className="w-full mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
        />
        <Input
          type="password"
          placeholder="Old Password"
          className="w-full mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
        />
        <Input
          type="password"
          placeholder="New Password"
          className="w-full mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
        />
        <Input
          type="password"
          placeholder="App Lock"
          className="w-full mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
        />
        <div className="mt-6 flex space-x-2 justify-center">
          <Button className="w-1/2 bg-accent text-white font-semibold p-3  hover:bg-accent hover:text-primary  hover:shadow-md">
            Save Changes
          </Button>
          <Button className="w-1/2 bg-primary text-accent font-semibold p-3 hover:shadow-md hover:bg-primary hover:text-secondary"
          onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
