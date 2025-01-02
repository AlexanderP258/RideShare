export const paymentApi = {
  async createPaymentIntent(token: string, rideId: number) {
    const response = await fetch(
      `http://localhost:8080/api/payments/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rideId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }
    return response.json();
  },
};
