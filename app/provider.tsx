"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
// import CartContext from "../context/CartContext"; 
import { WishlistProvider } from "../context/WishlistContext"; 
import { TokenProvider } from "../context/TokenContext";
import CartContextProvider from "../context/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TokenProvider>
        <CartContextProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartContextProvider>
      </TokenProvider>
    </SessionProvider>
  );
}
