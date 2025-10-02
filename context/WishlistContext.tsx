"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "./TokenContext"; 
import { toast } from "react-toastify";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useContext(TokenContext); 
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const headers = { token };

  const getWishlist = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL, { headers });
      if (data.status === "success") {
        setWishlistItems(data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching wishlist:", error);
      toast.error("Failed to load wishlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const { data } = await axios.post(API_URL, { productId }, { headers });
      if (data.status === "success") {
        await getWishlist();
        toast.success("💖 Product added to wishlist!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return data;
      }
    } catch (error) {
      console.error("❌ Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const { data } = await axios.delete(`${API_URL}/${productId}`, { headers });
      if (data.status === "success") {
        setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
        toast.info("🗑️ Product removed from wishlist", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return data;
      }
    } catch (error) {
      console.error("❌ Error removing product:", error);
      toast.error("Failed to remove product from wishlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      throw error;
    }
  };

  useEffect(() => {
    if (token) getWishlist();
  }, [token]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const getWishlistCount = () => wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
};
