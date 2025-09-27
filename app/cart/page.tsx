"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-10 text-center">Your cart is empty 🛒</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.imageCover}
                alt={item.title}
                width={80}
                height={80}
                className="rounded"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-green-600">{item.price} EGP</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 border rounded"
                  >
                    -1
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 border rounded"
                  >
                    +1
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">
                {item.price * item.quantity} EGP
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={clearCart}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Clear Cart
        </button>
        <p className="text-xl font-bold">
          Total:{" "}
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} EGP
        </p>
      </div>
    </div>
  );
}
