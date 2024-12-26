import React from "react";
import Image from "next/image";
import { Phone, QrCode, ArrowRight } from "lucide-react";

const DownloadAppSection = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-green-50 to-green-100 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
              <Phone className="mr-2 h-4 w-4" />
              Mobile App
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Enhance your driving experience with the{" "}
              <span className="text-green-600">RideShare app</span>
            </h2>

            <p className="mb-6 text-base text-gray-600">
              All rides and tickets in one place, real-time information and
              exclusive app features.
            </p>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.apple.com/app-store/"
                className="group flex items-center rounded-xl bg-black px-5 py-2.5 transition-transform hover:scale-105"
              >
                <div className="mr-3">
                  <svg
                    className="h-7 w-7 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-200">Download on</span>
                  <span className="text-lg font-semibold text-white">
                    App Store
                  </span>
                </div>
                <ArrowRight className="ml-3 h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://play.google.com/store/apps"
                className="group flex items-center rounded-xl bg-black px-5 py-2.5 transition-transform hover:scale-105"
              >
                <div className="mr-3">
                  <svg
                    className="h-7 w-7 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.61317 22.3822L12.0117 14L3.61317 5.61827C3.22284 5.99833 3 6.57868 3 7.27803V20.722C3 21.4213 3.22284 22.0021 3.61317 22.3822Z" />
                    <path d="M15.8117 14L20.4088 9.41168C20.7991 9.02135 21.0219 8.44101 21.0219 7.74166C21.0219 7.04231 20.7991 6.46196 20.4088 6.07163L12.0117 14L20.4088 21.9284C20.7991 21.538 21.0219 20.9577 21.0219 20.2583C21.0219 19.559 20.7991 18.9786 20.4088 18.5883L15.8117 14Z" />
                    <path d="M12.0117 14L3.61317 22.3822C3.9035 22.7725 4.48385 22.9953 5.1832 22.9953H18.8402C19.5396 22.9953 20.1199 22.7725 20.4088 22.3822L12.0117 14Z" />
                    <path d="M3.61317 5.61827L12.0117 14L20.4088 5.61827C20.1199 5.22794 19.5396 5.00511 18.8402 5.00511H5.1832C4.48385 5.00511 3.9035 5.22794 3.61317 5.61827Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-200">GET IT ON</span>
                  <span className="text-lg font-semibold text-white">
                    Google Play
                  </span>
                </div>
                <ArrowRight className="ml-3 h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-green-600">50+</p>
                <p className="text-xs text-gray-600">Active users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">4.8/5</p>
                <p className="text-xs text-gray-600">App rating</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-green-600">500+</p>
                <p className="text-xs text-gray-600">Downloads</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-green-600 to-green-400 opacity-20 blur-lg" />
                <div className="relative rounded-2xl bg-white p-6 shadow-xl">
                  <div className="mb-3 flex items-center space-x-2">
                    <QrCode className="mr-2 h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">
                      Scan to download
                    </span>
                  </div>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Image
                        src="/qr-code.png"
                        alt="QR Code"
                        width={440}
                        height={440}
                        className="h-auto w-auto object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">
                    Scan the QR code with your mobile to download the app
                    directly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppSection;
