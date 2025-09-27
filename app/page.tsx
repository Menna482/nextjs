"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Slidercat from "../components/SliderCat";
import Image from "next/image";


interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category?: { name: string };
  ratingsAverage?: number;
}

export default function FeedPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
       <Slidercat />
    
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="container mx-auto px-6 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto block border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => {
          const isInWishlist = wishlist.some(
            (item: any) => item.id === product._id
          );

          return (
         
            <div
              key={product._id}
              className="group border rounded-lg p-4 relative cursor-pointer flex flex-col justify-between"
              onClick={() => router.push(`/product/${product._id}`)}
            >
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={200}
                className="h-48 w-full object-contain mb-4"
              />
              <p className="text-green-600 text-sm">{product.category?.name}</p>
              <h2 className="font-semibold text-base mb-1">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.price} EGP</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-yellow-500">
                  <AiFillStar className="mr-1" />
                  <span>{product.ratingsAverage}</span>
                </div>
                <button
                  className={`${
                    isInWishlist ? "text-red-500" : "text-gray-600"
                  } hover:text-red-500`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInWishlist) {
                      removeFromWishlist(product._id);
                      setMessage(`${product.title} removed from wishlist ❌`);
                    } else {
                      addToWishlist({
                        id: product._id,
                        title: product.title,
                        price: product.price,
                        imageCover: product.imageCover,
                      });
                      setMessage(`${product.title} added to wishlist ❤️`);
                    }
                  }}
                >
                  <FaHeart size={18} />
                </button>
              </div>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md transition hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    id: product._id,
                    title: product.title,
                    price: product.price,
                    imageCover: product.imageCover,
                  });
                  setMessage(`${product.title} added to cart 🛒`);
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
