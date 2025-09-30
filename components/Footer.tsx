"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!year) return null;

  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">&copy; {year} E-Shop. All rights reserved.</p>
    </footer>
  );
}
