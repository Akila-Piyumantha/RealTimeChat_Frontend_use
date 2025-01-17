import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const SignupPage: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">SignUp</h2>
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
        <Button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          SignUp
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