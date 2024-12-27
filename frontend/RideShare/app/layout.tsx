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
      <body>
        <AuthProvider>
          {!hideHeader && <Header />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
