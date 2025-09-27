"use client";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return <p className="p-10 text-center">Your wishlist is empty ❤️</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      <div className="space-y-4">
        {wishlist.map((item) => (
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
              </div>
            </div>

            <div className="flex gap-3">
     
              <button
                onClick={() => {
                  addToCart(item); 
                  removeFromWishlist(item.id);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={clearWishlist}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Clear Wishlist
        </button>
      </div>
    </div>
  );
}
