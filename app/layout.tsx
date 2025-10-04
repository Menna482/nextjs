import "./globals.css";
import Providers from "./Provider";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "E-Shop",
  description: "E-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen font-sans bg-gray-50 flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
