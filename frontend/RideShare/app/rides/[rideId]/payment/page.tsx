"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import { paymentApi } from "@/app/api/paymentApi";
import { ridesApi } from "@/app/api/ridesApi";
import { useAuth } from "@/app/context/AuthContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
  const params = useParams();
  const rideId = Number(params.rideId);
  const router = useRouter();

  useEffect(() => {
    if (!rideId) {
      router.replace("/rides");
    }
  }, [rideId, router]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm rideId={rideId} />
    </Elements>
  );
}

function CheckoutForm({ rideId }: { rideId: number }) {
  const { token } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    setError("");
    setIsPaying(true);

    try {
      const { clientSecret } = await paymentApi.createPaymentIntent(
        token!,
        rideId
      );

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("No CardElement found.");

      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (stripeError) {
        setError(stripeError.message || "Payment failed. Try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        await ridesApi.joinRide(token!, rideId);

        alert("Payment successful! You have joined the ride.");
        router.push("/rides");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Pay for Ride #{rideId}</h1>
      <CardElement className="border p-3 rounded mb-4" />
      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handlePayment}
        disabled={isPaying || !stripe || !elements}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPaying ? "Processing..." : "Pay and Join Ride"}
      </button>
    </div>
  );
}
