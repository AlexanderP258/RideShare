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
          // Attach the token if present
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rides");
    }
    return response.json();
  },
};
