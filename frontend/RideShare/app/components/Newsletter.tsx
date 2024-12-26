"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-float-slow absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-50 blur-3xl opacity-75" />
            <div className="animate-float absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-50 blur-3xl opacity-75" />
          </div>

          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-xl text-center">
              <div className="transform inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 transition-transform duration-300 hover:scale-110">
                <Mail className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Stay Updated on New Rides
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Get notified about new rides, special offers, and travel tips
                delivered straight to your inbox.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="mt-10">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="relative w-full max-w-md group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-300 focus:border-green-500 focus:ring-green-500 group-hover:border-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex w-full transform items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-300 hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 sm:w-auto"
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="mt-10 transform rounded-lg bg-green-50 p-6 transition-all duration-500 animate-fade-in">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-6 w-6 animate-scale-in" />
                    <span className="text-lg font-medium">
                      Successfully subscribed!
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Thank you for subscribing. Check your email for
                    confirmation.
                  </p>
                </div>
              )}

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    title: "Weekly Updates",
                    description: "Get notified about new rides in your area",
                  },
                  {
                    title: "Exclusive Offers",
                    description: "Access to special deals and promotions",
                  },
                  {
                    title: "Travel Tips",
                    description: "Useful advice for better ridesharing",
                  },
                ].map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="transform rounded-lg bg-green-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
