"use client";

import React, { useState } from "react";
import { Search, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold text-green-600">RideShare</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/rides"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              View all Rides
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <button
              className="text-gray-600 hover:text-green-600 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/create-ride"
              className="hidden sm:block px-4 py-2 rounded-lg bg-green-100 text-green-600 font-medium hover:bg-green-200 transition-colors"
            >
              Create Your Ride
            </Link>

            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 rounded-full bg-green-600 p-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <User className="h-6 w-6 text-white" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  {token ? (
                    <>
                      <button
                        onClick={() => handleNavigation("/my-rides")}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Rides
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleNavigation("/login")}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => handleNavigation("/register")}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-200">
        <div className="space-y-1 px-4 py-2">
          <Link
            href="/about"
            className="block py-2 text-gray-600 hover:text-green-600"
          >
            About Us
          </Link>
          <Link
            href="/rides"
            className="block py-2 text-gray-600 hover:text-green-600"
          >
            View all Rides
          </Link>
          <Link
            href="/create-ride"
            className="block py-2 text-gray-600 hover:text-green-600"
          >
            Create Your Ride
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
