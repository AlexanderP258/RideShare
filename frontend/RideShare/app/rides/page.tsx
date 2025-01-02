"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ridesApi } from "@/app/api/ridesApi";
import { useAuth } from "@/app/context/AuthContext";
import { CalendarDays, MapPin } from "lucide-react";

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
  const [joinError, setJoinError] = useState("");
  const [joinMessage, setJoinMessage] = useState("");

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
    setIsLoading(true);
    setError("");
    setJoinError("");
    setJoinMessage("");
    try {
      const data = await ridesApi.getRides(token, { start, end, date });
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

  const handleJoinRide = async (rideId: number) => {
    if (!token) {
      setJoinError("You must be logged in to join a ride.");
      return;
    }

    setJoinError("");
    setJoinMessage("");

    try {
      const result = await ridesApi.joinRide(token, rideId);

      if (typeof result === "object" && result.message) {
        setJoinMessage(result.message);
      } else {
        setJoinMessage("You have successfully joined the ride!");
      }

      fetchRides();
    } catch (err: any) {
      setJoinError(err.message || "Failed to join ride");
    }
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

        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSearch} className="relative">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <div className="mt-1 flex items-center">
                    <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Departure city"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <div className="mt-1 flex items-center">
                    <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Destination city"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 flex items-center">
                    <CalendarDays className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 pl-10 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

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

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}
        {joinError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {joinError}
          </div>
        )}
        {joinMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-600">
            {joinMessage}
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
                    <span className="font-medium">Price:</span> {ride.price} Kr
                  </p>
                </div>
                {ride.availableSeats > 0 && (
                  <button
                    onClick={() => router.push(`/rides/${ride.id}/payment`)}
                    className="mt-3 inline-block px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Proceed to Payment
                  </button>
                )}
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
