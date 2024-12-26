"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";

const Hero = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", formData);
  };

  return (
    <div className="relative min-h-[600px] w-full bg-gradient-to-br from-green-50 to-green-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Share Your Journey,
            <span className="block text-green-600">Save Together</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Find your perfect carpool match. Save money, reduce emissions, and
            make new connections on your daily commute.
          </p>
        </div>

        {/* Search form */}
        <div className="mx-auto mt-12 max-w-3xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-4">
                {/* From field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <div className="mt-1 flex items-center">
                    <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.from}
                      onChange={(e) =>
                        setFormData({ ...formData, from: e.target.value })
                      }
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Departure city"
                    />
                  </div>
                </div>

                {/* To field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <div className="mt-1 flex items-center">
                    <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.to}
                      onChange={(e) =>
                        setFormData({ ...formData, to: e.target.value })
                      }
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Destination city"
                    />
                  </div>
                </div>

                {/* Date field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 flex items-center">
                    <Calendar className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Passengers field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Passengers
                  </label>
                  <div className="mt-1 flex items-center">
                    <Users className="absolute left-3 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.passengers}
                      onChange={(e) =>
                        setFormData({ ...formData, passengers: e.target.value })
                      }
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "passenger" : "passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search button */}
              <div className="bg-gray-50 px-6 py-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Search Rides
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "50+", label: "Active Users" },
            { value: "100+", label: "Rides Shared" },
            { value: "200+", label: "KG CO₂ Saved" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-green-600">
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

export default Hero;
