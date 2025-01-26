"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


export default function Home() {

  const router=useRouter();

  const handleUnlock = () => {
    router.push("/chat");
  };

  const handleLogout = () => {
    router.push("/sign-in");
  };

  return (
    <div className="bg-background h-screen flex flex-row items-start font-body">
    <div className="bg-white mx-auto my-auto w-[800px] border-2 border-gray-200 rounded-lg p-10">
    <Avatar className="mx-auto w-24 h-24">
        <AvatarImage src="dp.jpg" />
      </Avatar>
      <div className="text-center">
      <h1 className="my-4 text-2xl">UserName</h1>
      <Input
                type="password"
                placeholder="Password"
                className="w-40 mx-auto border border-white "
                required
              />
              <div className="flex flex-col">
              <Button className="w-28 my-4 mx-auto bg-primary text-white p-3 rounded-3xl hover:bg-secondary hover:shadow-md"
              onClick={handleUnlock}>
                Unlock
              </Button>
              <Button className="w-28 my-4 mx-auto bg-white text-text p-3 rounded-3xl hover:shadow-md hover:bg-white hover:text-secondary"
              onClick={handleLogout}>
                Log out
              </Button>
              </div>
</div>
    </div>
    </div>
  );
}
