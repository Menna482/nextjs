
"use client";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <p className="p-10 text-center text-gray-600">
        Your wishlist is empty ❤️
      </p>
    );
  }

  const handleMoveAllToCart = async () => {
    for (const item of wishlistItems) {
      await addToCart(item._id);
    }
    clearWishlist();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="space-y-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.imageCover}
                alt={item.title}
                width={80}
                height={80}
                className="rounded object-contain"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-green-600">{item.price} EGP</p>
              </div>
            </div>

           
            <div className="flex gap-3">
              <button
                onClick={() => addToCart(item._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

  
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={handleMoveAllToCart}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Move All to Cart
        </button>
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

