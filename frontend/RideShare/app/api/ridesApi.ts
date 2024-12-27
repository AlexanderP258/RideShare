export const ridesApi = {
  async getRides(
    token: string,
    params?: { start?: string; end?: string; date?: string }
  ) {
    const query = new URLSearchParams();
    if (params?.start) query.set("start", params.start);
    if (params?.end) query.set("end", params.end);
    if (params?.date) query.set("date", params.date);

    const response = await fetch(
      `http://localhost:8080/api/rides?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rides");
    }
    return response.json();
  },

  async createRide(
    token: string,
    rideData: {
      startLocation: string;
      endLocation: string;
      departureTime: string;
      availableSeats: number;
      price: number;
    }
  ) {
    const response = await fetch("http://localhost:8080/api/rides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      throw new Error("Failed to create ride");
    }
    return response.json();
  },

  async joinRide(token: string, rideId: number) {
    const response = await fetch(
      `http://localhost:8080/api/rides/${rideId}/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to join ride");
    }

    return response.json();
  },
};
