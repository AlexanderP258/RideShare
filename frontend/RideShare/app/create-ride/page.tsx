"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ridesApi } from "@/app/api/ridesApi";
import { useAuth } from "@/app/context/AuthContext";

export default function CreateRidePage() {
  const router = useRouter();
  const { token } = useAuth();

  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState(1);
  const [price, setPrice] = useState(100);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validCities = [
    "Stockholm",
    "Gothenburg",
    "Karlstad",
    "Malmö",
    "Copenhagen",
    "Berlin",
    "Frankfurt",
    "Paris",
    "Barcelona",
  ];

  const validPrices = Array.from({ length: 20 }, (_, i) => 100 + i * 100);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!startLocation || !endLocation || !departureTime) {
      setError("Please fill in all fields with valid data.");
      return;
    }

    if (price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    setIsLoading(true);
    try {
      await ridesApi.createRide(token!, {
        startLocation,
        endLocation,
        departureTime,
        availableSeats,
        price,
      });
      setSuccess("Ride created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create ride.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-green-600 text-center mt-8">
          Create a New Ride
        </h1>

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow space-y-4"
        >
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

          <div>
            <label
              htmlFor="startLocation"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Start Location
            </label>
            <select
              id="startLocation"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">-- Select City --</option>
              {validCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="endLocation"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              End Location
            </label>
            <select
              id="endLocation"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">-- Select City --</option>
              {validCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="departureTime"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Departure Time
            </label>
            <input
              id="departureTime"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              step={900}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="availableSeats"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Available Seats
            </label>
            <input
              id="availableSeats"
              type="number"
              min={1}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price per Seat (SEK)
            </label>
            <select
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              {validPrices.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {isLoading ? "Creating Ride..." : "Create Ride"}
          </button>
        </form>
      </div>
    </main>
  );
}
