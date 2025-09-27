"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { WishlistProvider } from "../context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>
      <WishlistProvider>
            <CartProvider>


    {children}
            </CartProvider>
      </WishlistProvider>
    </SessionProvider>;
}
