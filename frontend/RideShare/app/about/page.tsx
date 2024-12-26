import React from "react";
import { Globe2, Users, Car, Leaf, ArrowUpRight } from "lucide-react";
import Header from "../components/Header";

const Stats = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
    <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
    <div className="text-gray-500 text-sm text-center">{label}</div>
  </div>
);

const ValueCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm">
    <div className="p-3 bg-green-50 rounded-lg mb-4">
      <Icon className="h-6 w-6 text-green-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative bg-gradient-to-br from-green-50 to-green-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Revolutionizing Carpooling
            <span className="block text-green-600">in Sweden</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
            Born from a personal need, we're building the future of sustainable
            transportation one shared journey at a time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              In 2019, when I, Alexander, moved from Germany to Sweden, I
              noticed a significant gap in the market. The lack of an efficient
              carpooling solution made it challenging for newcomers and locals
              alike to travel between cities sustainably and affordably.
            </p>
            <p className="text-gray-600 mb-6">
              Drawing from my experience with Germany's well-established
              carpooling culture, I envisioned bringing that same convenience
              and community spirit to Sweden. What started as a personal
              solution has grown into Sweden's fastest-growing mobility
              platform.
            </p>
            <button className="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
              Read our full story <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Stats number="50+" label="Active Users" />
            <Stats number="100+" label="Rides Shared" />
            <Stats number="200+" label="Tons CO² Saved" />
            <Stats number="58+" label="Cities Connected" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're driven by a set of core values that guide every decision we
              make and every feature we build.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={Globe2}
              title="Community First"
              description="Building connections that go beyond just sharing rides, creating lasting relationships within our community."
            />
            <ValueCard
              icon={Users}
              title="Trust & Safety"
              description="Maintaining the highest standards of security and verification to ensure safe journeys for everyone."
            />
            <ValueCard
              icon={Car}
              title="Accessibility"
              description="Making intercity travel affordable and available to everyone, regardless of their location."
            />
            <ValueCard
              icon={Leaf}
              title="Sustainability"
              description="Reducing carbon emissions through shared mobility while building a greener future for transportation."
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-12 text-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you're a driver looking to share your journey or a
              passenger seeking an affordable ride, we're here to connect you
              with fellow travelers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm">
                Download App
              </button>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals who want to make a
            difference in sustainable transportation. Check out our open
            positions.
          </p>
          <button className="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
            View open positions <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
