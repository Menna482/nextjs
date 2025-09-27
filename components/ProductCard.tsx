"use client";

import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToWishlist } = useWishlist();

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      <img src={product.imageCover} alt={product.title} style={{ width: "100%", borderRadius: "5px" }} />
      <h3>{product.title}</h3>
      <p>{product.price} EGP</p>

      {/* زر القلب */}
      <button
        onClick={() => addToWishlist(product)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "22px",
        }}
      >
        🤍
      </button>
    </div>
  );
}
