"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import {CartProvider} from "../context/CartContext"; // ✅ صح
import {WishlistProvider} from "../context/WishlistContext"; // لو عاملها default برضو

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
