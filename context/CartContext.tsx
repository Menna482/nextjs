"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "./TokenContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(TokenContext);

  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartId, setCartId] = useState("");

  const API_URL = "https://ecommerce.routemisr.com/api/v1/cart";
  const ORDER_URL = "https://ecommerce.routemisr.com/api/v1/orders";
  const headers = { token: token || "" };

  useEffect(() => {
    if (token) getCart();
  }, [token]);

  async function addToCart(productId) {
    try {
      if (!token) return console.warn("No token found, cannot add to cart");
      const { data } = await axios.post(API_URL, { productId }, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        await getCart();
      }
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  }

  async function getCart() {
    try {
      if (!token) return console.warn("No token found, cannot fetch cart");
      const { data } = await axios.get(API_URL, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.cartId);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  }

  async function removeProduct(id) {
    try {
      if (!token) return console.warn("No token found, cannot remove product");
      const { data } = await axios.delete(`${API_URL}/${id}`, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error.message);
    }
  }

  async function updateCount(id, count) {
    try {
      if (!token) return console.warn("No token found, cannot update count");
      const { data } = await axios.put(`${API_URL}/${id}`, { count }, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error updating count:", error.response?.data || error.message);
    }
  }

  async function cashOnDelivery(shippingAddress) {
    try {
      if (!token) return console.warn("No token found, cannot checkout");
      const { data } = await axios.post(
        `${ORDER_URL}/${cartId}`,
        { shippingAddress },
        { headers }
      );
      if (data.status === "success") {
        getCart();
      }
      return data;
    } catch (error) {
      console.error("Error with cash on delivery:", error.response?.data || error.message);
    }
  }

  async function onlinePayment(shippingAddress) {
    try {
      if (!token) return console.warn("No token found, cannot pay online");
      const { data } = await axios.post(
        `${ORDER_URL}/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress },
        { headers }
      );
      return data;
    } catch (error) {
      console.error("Error with online payment:", error.response?.data || error.message);
    }
  }

  async function getUserOrders(userId) {
    try {
      if (!userId) return console.warn("No userId provided for fetching orders");
      const { data } = await axios.get(`${ORDER_URL}/user/${userId}`, { headers });
      return data;
    } catch (error) {
      console.error("Error fetching user orders:", error.response?.data || error.message);
    }
  }

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        removeProduct,
        updateCount,
        cashOnDelivery,
        onlinePayment,
        getUserOrders,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within CartContextProvider");
  }
  return context;
}
