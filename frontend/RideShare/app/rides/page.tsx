"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ridesApi } from "@/app/api/ridesApi";
import { useAuth } from "@/app/context/AuthContext";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ride {
  id: number;
  driverUsername: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  availableSeats: number;
  price: number;
  createdAt: string;
}

export default function RidesPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      fetchRides();
    }
  }, [token]);

  const fetchRides = async () => {
    setError("");
    setIsLoading(true);
    try {
      const data = await ridesApi.getRides(token!, { start, end, date });
      setRides(data);
    } catch (err: any) {
      setError(err.message || "Failed to load rides");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    fetchRides();
  };

  if (!token) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="w-full max-w-4xl mt-8 space-y-6">
        <h1 className="text-3xl font-bold text-emerald-600 text-center">
          Available Rides
        </h1>

        <div className="rounded-lg border bg-white shadow-lg p-4">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div>
              <label
                htmlFor="start"
                className="text-sm font-medium text-gray-700"
              >
                Start Location
              </label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="start"
                  type="text"
                  placeholder="City A"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className={cn(
                    "pl-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="end"
                className="text-sm font-medium text-gray-700"
              >
                End Location
              </label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="end"
                  type="text"
                  placeholder="City B"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className={cn(
                    "pl-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Departure Date
              </label>
              <div className="relative mt-1">
                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={cn(
                    "pl-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  )}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                  "bg-emerald-600 text-white hover:bg-emerald-700",
                  "h-10 w-full"
                )}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {isLoading && (
          <p className="text-center text-gray-600">Loading rides...</p>
        )}

        {!isLoading && rides.length > 0 && (
          <ul className="space-y-4">
            {rides.map((ride) => (
              <li
                key={ride.id}
                className="rounded-lg border bg-white p-4 shadow"
              >
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold text-emerald-700">
                    Driver: {ride.driverUsername}
                  </p>
                  <p>
                    <span className="font-medium">Route:</span>{" "}
                    {ride.startLocation} &rarr; {ride.endLocation}
                  </p>
                  <p>
                    <span className="font-medium">Departure:</span>{" "}
                    {new Date(ride.departureTime).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Seats Available:</span>{" "}
                    {ride.availableSeats}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> ${ride.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !error && rides.length === 0 && (
          <p className="text-center text-gray-600">No rides found.</p>
        )}
      </div>
    </main>
  );
}
