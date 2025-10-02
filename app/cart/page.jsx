
"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cartDetails,  
    getCart,      
    updateCount,  
    removeProduct, 
    clearCart,    
  } = useCart();

  const router = useRouter();

  useEffect(() => {

    if (typeof getCart === "function") getCart();
  }, [getCart]);

  useEffect(() => {

  }, [cartDetails]);

  const products = useMemo(() => {
    const cd = cartDetails;

    if (!cd) return [];
 if (Array.isArray(cd)) return cd;
    if (Array.isArray(cd.products)) return cd.products;
    if (Array.isArray(cd.data)) return cd.data; 
    if (Array.isArray(cd.data?.products)) return cd.data.products;
    if (Array.isArray(cd.data?.data?.products)) return cd.data.data.products;
    if (Array.isArray(cd.cart?.products)) return cd.cart.products;

    return [];
  }, [cartDetails]);

  const totalPrice = products.reduce((acc, item) => {
    const price = item.product?.price ?? item.price ?? 0;
    const count = item.count ?? item.quantity ?? 1;
    return acc + price * count;
  }, 0);

  if (!cartDetails) {
    return <p className="text-center py-10">Loading cart...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center py-10">Your cart is empty 🛒</p>;
  }

  return (
    <div className="overflow-x-auto mt-10 container mx-auto px-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              const prod = item.product ?? item; 
              const id = prod._id ?? item._id ?? Math.random().toString(36); 
              const price = prod.price ?? item.price ?? 0;
              const count = item.count ?? item.quantity ?? 1;

              return (
                <tr key={id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    {prod.imageCover ? (
      
                      <Image
                        src={prod.imageCover}
                        alt={prod.title || "product"}
                        width={80}
                        height={80}
                        className="rounded object-contain"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded" />
                    )}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {prod.title ?? "Product"}
                  </td>

                  <td className="px-6 py-4">{price} EGP</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (count <= 1) {
                          
                            removeProduct && removeProduct(prod._id ?? id);
                          } else {
                            updateCount && updateCount(prod._id ?? id, count - 1);
                          }
                        }}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span>{count}</span>

                      <button
                        onClick={() => updateCount && updateCount(prod._id ?? id, count + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4">{price * count} EGP</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeProduct && removeProduct(prod._id ?? id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold">
          Total Price: <span className="text-green-600">{totalPrice} EGP</span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => clearCart && clearCart()}
            className="px-5 py-2 bg-red-700 text-white rounded-lg"
          >
            Clear Cart
          </button>

          <button
            onClick={() => router.push("/checkout")}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
