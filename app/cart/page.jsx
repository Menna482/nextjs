"use client";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, getUserCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    getUserCart();
  }, []);

  if (!cartItems || cartItems.length === 0) {
    return <p className="text-center py-10">Your cart is empty 🛒</p>;
  }


  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="overflow-x-auto mt-10">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Total</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product._id} className="border-b">
              <td className="p-4">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={70}
                  height={70}
                  className="rounded-lg"
                />
              </td>
              <td className="p-4">{item.product.title}</td>
              <td className="p-4">{item.product.price} EGP</td>
              <td className="p-4 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product._id, item.count - 1)}
                  disabled={item.count <= 1}
                  className="px-2 bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => updateQuantity(item.product._id, item.count + 1)}
                  className="px-2 bg-gray-300 rounded"
                >
                  +
                </button>
              </td>
              <td className="p-4">{item.price} EGP</td>
              <td className="p-4">
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold">
          Total Price: <span className="text-green-600">{totalPrice} EGP</span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={clearCart}
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
