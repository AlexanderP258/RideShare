"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/app/api/userApi";
import { useAuth } from "@/app/context/AuthContext";

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

export default function MyRidesPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);
  const [createdRides, setCreatedRides] = useState<Ride[]>([]);
  const [joinedRides, setJoinedRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    if (token && userId !== null) {
      fetchMyRides();
    }
  }, [token, userId]);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(Number(storedId));
    }
  }, []);

  async function fetchMyRides() {
    setIsLoading(true);
    setError("");
    try {
      const created = await userApi.getCreatedRides(token!, userId!);
      const joined = await userApi.getJoinedRides(token!, userId!);
      setCreatedRides(created);
      setJoinedRides(joined);
    } catch (err: any) {
      setError(err.message || "Failed to fetch your rides");
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl mt-8 space-y-6">
        <h1 className="text-3xl font-bold text-emerald-600 text-center">
          My Rides
        </h1>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {isLoading && (
          <p className="text-center text-gray-600">Loading your rides...</p>
        )}

        {!isLoading && (
          <>
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-emerald-700">
                Rides I Created
              </h2>
              {createdRides.length > 0 ? (
                <ul className="space-y-4">
                  {createdRides.map((ride) => (
                    <li
                      key={ride.id}
                      className="rounded border bg-white p-4 shadow"
                    >
                      <p>
                        Route: {ride.startLocation} → {ride.endLocation}
                      </p>
                      <p>
                        Departure:{" "}
                        {new Date(ride.departureTime).toLocaleString()}
                      </p>
                      <p>Available Seats: {ride.availableSeats}</p>
                      <p>Price: {ride.price} Kr</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No rides created yet.</p>
              )}
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-emerald-700">
                Rides I Joined
              </h2>
              {joinedRides.length > 0 ? (
                <ul className="space-y-4">
                  {joinedRides.map((ride) => (
                    <li
                      key={ride.id}
                      className="rounded border bg-white p-4 shadow"
                    >
                      <p>
                        Route: {ride.startLocation} → {ride.endLocation}
                      </p>
                      <p>
                        Departure:{" "}
                        {new Date(ride.departureTime).toLocaleString()}
                      </p>
                      <p>Available Seats: {ride.availableSeats}</p>
                      <p>Price: {ride.price} Kr</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No rides joined yet.</p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
