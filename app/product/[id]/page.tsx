"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category?: { name: string };
  ratingsAverage?: number;
}

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();


  async function getProduct() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
      );
      setProduct(data.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  }

  useEffect(() => {
    getProduct();
  }, [params.id]);


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!product) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="flex justify-center">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={400}
          height={400}
          className="object-contain rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 font-semibold text-xl mb-2">
          {product.price} EGP
        </p>
        <p className="mb-4">Category: {product.category?.name}</p>
        <p className="mb-4">⭐ {product.ratingsAverage}</p>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          onClick={async () => {
            await addToCart(product._id); 
            setMessage(`${product.title} added to cart 🛒`);
          }}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}
