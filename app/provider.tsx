"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import {CartProvider} from "../context/CartContext"; 
import {WishlistProvider} from "../context/WishlistContext"; 

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
