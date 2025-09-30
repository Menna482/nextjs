"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToken } from "../../context/TokenContext";
import jwtDecode from "jwt-decode";

interface Order {
  _id: string;
  isPaid: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
}

export default function AllOrders() {
  const { getUserOrders } = useCart();
  const { token } = useToken();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const decoded: any = jwtDecode(token);
        const data = await getUserOrders(decoded.id);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    })();
  }, [token]);

  return (
    <div className="relative my-12 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Order ID</th>
            <th scope="col" className="px-6 py-3">is Paid</th>
            <th scope="col" className="px-6 py-3">Payment Method Type</th>
            <th scope="col" className="px-6 py-3">Total Order Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order._id}
                </th>
                <td className="px-6 py-4">{order.isPaid ? "Paid" : "Not Paid"}</td>
                <td className="px-6 py-4">{order.paymentMethodType}</td>
                <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
