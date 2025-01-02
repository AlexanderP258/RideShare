"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeader = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <head>
        <title>RideShare - Carpooling Application</title>
        <link rel="icon" type="image/png" href="/images/rideshare-icon.png" />
        <meta
          name="description"
          content="A modern carpooling application for convenient ride sharing"
        />
      </head>
      <body>
        <AuthProvider>
          {!hideHeader && <Header />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
