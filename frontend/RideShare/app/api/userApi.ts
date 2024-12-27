export const userApi = {
  async getCreatedRides(token: string, userId: number) {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/rides`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch created rides");
    }
    return response.json();
  },

  async getJoinedRides(token: string, userId: number) {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch joined rides");
    }
    return response.json();
  },
};
