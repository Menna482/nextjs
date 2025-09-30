"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface CartItem {
  product: {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
  };
  count: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  getUserCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getUserCart = async () => {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("userToken") },
      });
      setCartItems(data?.data?.products || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartItems([]);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("userToken") } }
      );
      setCartItems(data?.data?.products || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateQuantity = async (productId: string, count: number) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token: localStorage.getItem("userToken") } }
      );
      setCartItems(data?.data?.products || []);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token: localStorage.getItem("userToken") } }
      );
      setCartItems(data?.data?.products || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("userToken") },
      });
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, getUserCart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
