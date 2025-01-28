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
    <div className="bg-background text-white h-screen flex flex-row items-start font-body">
    <div className="bg-secondary mx-auto my-auto w-[800px] border-2 border-primary rounded-lg p-10">
    <Avatar className="mx-auto w-24 h-24">
        <AvatarImage src="dp.jpg" />
      </Avatar>
      <div className="text-center">
      <h1 className="mt-4 mb-6 text-2xl">UserName</h1>
      <h1 className="text-text font-semibold mb-2">App Lock is on</h1>
      <Input
                type="password"
                placeholder="Password"
                className="w-40 mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
                required
              />
              <div className="flex flex-col">
              <Button className="w-28 my-4 mx-auto bg-accent text-white p-3 rounded-3xl hover:bg-accent hover:text-primary  hover:shadow-md"
              onClick={handleUnlock}>
                Unlock
              </Button>
              <h1 className="text-text mt-8">Sign out and Sign in with other account</h1>
              <Button className="w-28 my-4 mx-auto bg-primary text-accent p-3 rounded-3xl hover:shadow-md hover:bg-primary hover:text-secondary"
              onClick={handleLogout}>
                Log out
              </Button>
              </div>
</div>
    </div>
    </div>
  );
}
