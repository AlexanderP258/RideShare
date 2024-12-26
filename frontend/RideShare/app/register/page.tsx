"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/api/auth";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-emerald-600 text-white hover:bg-emerald-700",
        "h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !username) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.register({ email, username, password });
      if (res.message) {
        setSuccess(res.message);
      } else {
        setSuccess("Registration successful!");
      }

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-lg border bg-white text-gray-900 shadow-lg">
          {/* Header */}
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-center space-x-2">
              <UserPlus className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-center text-emerald-600">
                Create your account
              </h2>
            </div>
            <p className="text-sm text-center text-gray-500">
              Enter your details below to create your account
            </p>
          </div>

          {/* Form */}
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-600">
                  {success}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Log in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
