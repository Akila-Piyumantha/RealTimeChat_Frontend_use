'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const { register, error, loading, clearError } = useAuth();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    await register(data.name, data.email, data.password);
  };

  return (
    <div className="bg-background text-white min-h-screen flex flex-col justify-center items-center p-4 font-body">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-secondary border-primary border-2 rounded-lg p-8 shadow-lg">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl mb-6 font-bold text-center font-title bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Create Account
            </h2>
          </motion.div>

          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-950 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Your username"
                        className="w-full border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none bg-secondary/50"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none bg-secondary/50"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-primary hover:border-b-accent focus:border-b-4 focus:border-b-accent focus:outline-none bg-secondary/50"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white font-semibold p-6 h-12 hover:bg-accent/90 hover:shadow-accent/20 hover:shadow-lg transition-all duration-300 rounded-md"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/60">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-accent hover:text-accent/80 hover:underline transition-colors"
                onClick={clearError}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;