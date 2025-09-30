"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";

interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { addToCart } = useCart(); // يعمل لأن CartProvider فوقه

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wishlist");
      if (stored) setWishlistItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlistItems.find((i) => i._id === item._id)) {
      setWishlistItems([...wishlistItems, item]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
};
