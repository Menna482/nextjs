import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "./provider";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Next.js + TypeScript + NextAuth + TailwindCSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans bg-gray-50 flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}