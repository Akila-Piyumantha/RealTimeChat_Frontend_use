'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import React from "react";

const SigninPage: React.FC = () => {



  return (
    <div className="bg-background text-white h-screen flex flex-row items-start font-body">
      <form className="bg-secondary border-primary border-2 mx-auto my-auto w-[380px] rounded-lg p-10 shadow-md space-y-4">
        <h2 className="text-2xl mb-6 font-bold text-center font-title">Sign In</h2>
        <Input
          type="email"
          placeholder="Email"
          className="w-full mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full mx-auto border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none"
          required
        />
        <Button className="w-full bg-accent text-white font-semibold p-3  hover:bg-accent hover:text-primary  hover:shadow-md">
          Sign In
        </Button>
        <div className="mt-6 flex space-x-2 justify-center">
          <label htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="underline ">
              Register Here
            </Link>
          </label>
        </div>
      </form>


    </div>
  );
};

export default SigninPage;
