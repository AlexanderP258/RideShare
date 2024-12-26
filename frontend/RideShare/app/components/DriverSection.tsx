"use client";

import React from "react";
import { CarFront, Coins, LeafyGreen } from "lucide-react";

const DriverSection = () => {
  const handleNavigate = () => {
    window.location.href = "/create-ride";
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-20 top-20 h-64 w-64 rounded-full bg-green-50 opacity-30" />
        <div className="animate-float-delayed absolute -right-32 top-40 h-96 w-96 rounded-full bg-green-50 opacity-40" />
        <div className="animate-float absolute left-1/2 top-3/4 h-72 w-72 rounded-full bg-green-50 opacity-30" />

        <div className="animate-pulse absolute left-1/4 top-1/3 h-4 w-4 rounded-full bg-green-200" />
        <div className="animate-pulse absolute right-1/4 top-2/3 h-3 w-3 rounded-full bg-green-300" />
        <div className="animate-pulse absolute left-3/4 top-1/4 h-2 w-2 rounded-full bg-green-400" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Drive and <span className="text-green-600">Save</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Register as a driver and turn your empty seats into extra income
            while helping others commute sustainably.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              icon: <Coins className="h-6 w-6 text-green-600" />,
              title: "Earn Extra Income",
              description:
                "Set your own prices and earn money from your daily commute",
            },
            {
              icon: <CarFront className="h-6 w-6 text-green-600" />,
              title: "Flexible Schedule",
              description: "Share rides whenever it suits your schedule",
            },
            {
              icon: <LeafyGreen className="h-6 w-6 text-green-600" />,
              title: "Reduce Emissions",
              description:
                "Help create a greener future by sharing your journey",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 transition-all duration-300 group-hover:bg-green-300 group-hover:shadow-lg">
                <div className="transition-all duration-300 group-hover:text-white">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-center text-gray-600">
                {benefit.description}
              </p>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleNavigate}
            className="transform inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Start Driving Today
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-gray-200 pt-12 sm:grid-cols-4">
          {[
            { value: "4.9/5", label: "Driver Rating" },
            { value: "15K SEK+", label: "Avg. Monthly Earnings" },
            { value: "50+", label: "Active Drivers" },
            { value: "100%", label: "Secure Payments" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="transform text-center transition-all duration-300 "
            >
              <div className="text-2xl font-bold text-green-600">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverSection;
