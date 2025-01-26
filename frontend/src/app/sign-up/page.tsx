import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const SignupPage: React.FC = () => {
  return (
    <div className="bg-background h-screen flex flex-row items-start font-body">
      <form className="bg-white mx-auto my-auto w-[380px] rounded-lg p-10 shadow-md space-y-4">
        <h2 className="text-2xl mb-6 font-bold text-center font-title">Sign Up</h2>
        <Input
          type="name"
          placeholder="User Name"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Button className="w-full bg-primary text-white font-semibold p-3 hover:bg-secondary hover:shadow-md">
          Sign Up
        </Button>
        <div className="mt-6 flex space-x-2 justify-center">
        <label htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline ">
            SignIn
          </Link>
        </label>
      </div>
      </form>
    </div>
   
  );
};

export default SignupPage;