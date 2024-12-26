import React from "react";
import {
  ChevronRight,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              All Destinations
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Popular Routes",
                "University Routes",
                "Weekend Getaways",
                "City Connections",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Rides
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Stockholm → Gothenburg",
                "Malmö → Stockholm",
                "Uppsala → Stockholm",
                "Gothenburg → Malmö",
                "Västerås → Stockholm",
                "Örebro → Gothenburg",
                "Linköping → Stockholm",
              ].map((route) => (
                <li key={route}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              International Routes
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Copenhagen → Stockholm",
                "Oslo → Gothenburg",
                "Stockholm → Berlin",
                "Hamburg → Malmö",
                "Amsterdam → Stockholm",
                "Stockholm → Paris",
                "Helsinki → Stockholm",
              ].map((route) => (
                <li key={route}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Info</h3>
            <ul className="mt-4 space-y-3">
              {[
                "About Us",
                "How It Works",
                "Trust & Safety",
                "Terms of Service",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <Globe className="h-5 w-5" />
                <span>English</span>
              </button>

              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>© 2024 RideShare. All rights reserved.</span>
              <Link href="#" className="hover:text-green-600">
                Cookies
              </Link>
              <Link href="#" className="hover:text-green-600">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
