import React from "react";

const SigninPage: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">SignIn</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          SignIn
        </button>
      </form>
    </div>
  );
};

export default SigninPage;
