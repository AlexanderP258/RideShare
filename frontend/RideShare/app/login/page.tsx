"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/api/auth";
import { useAuth } from "@/app/context/AuthContext";
import { Loader2, User, Lock, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../components/Logo";

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        className
      )}
      {...props}
    />
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}
const Button = ({ className, children, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium",
        "bg-emerald-600 text-white hover:bg-emerald-700",
        "h-10 px-4 py-2",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
      {children}
    </button>
  );
};

export default function Login() {
  const router = useRouter();
  const { setToken } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.login({
        username: formData.username,
        password: formData.password,
      });

      setToken(response.token);
      if (response.userId) {
        localStorage.setItem("userId", String(response.userId));
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mb-6">
        <Logo imageSize={60} textSize="text-2xl" />
      </div>
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-lg border bg-white text-gray-900 shadow-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-center space-x-2">
              <LogIn className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-center text-emerald-600">
                Log in to your account
              </h2>
            </div>
            <p className="text-sm text-center text-gray-500">
              Enter your username and password
            </p>
          </div>

          <div className="p-6 pt-0">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    className="pl-10"
                    value={formData.username}
                    onChange={handleChange}
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
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </div>

          <div className="p-6 pt-0">
            <div className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
