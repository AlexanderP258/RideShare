"use client";

import React from "react";
import { Coins, UserCheck, Zap } from "lucide-react";

const Banner = () => {
  const features = [
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Trips you choose for less money",
      description:
        "Wherever you want to go, as a passenger, in our wide range of destinations and routes you'll find the perfect trip at an affordable price.",
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Travel with confidence",
      description:
        "We take the time to get to know all our members partners. How? We verify reviews, profiles, and ID documents so you know who you're traveling with.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Scroll, click, tap and go!",
      description:
        "Booking a trip has never been easier! Thanks to our simple and technologically advanced app, you can book a nearby trip in just minutes.",
    },
  ];

  return (
    <div className="relative w-full bg-white py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-8 h-72 w-72 rounded-full bg-green-50 opacity-50" />
        <div className="absolute -right-4 bottom-8 h-72 w-72 rounded-full bg-green-50 opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center rounded-2xl bg-white p-6 text-center transition-all hover:shadow-xl"
            >
              {/* Icon container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all group-hover:bg-green-600 group-hover:text-white">
                {feature.icon}
              </div>

              {/* Text content */}
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600">{feature.description}</p>

              {/* Decorative line */}
              <div className="absolute left-0 top-24 h-1 w-0 bg-green-600 transition-all group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
