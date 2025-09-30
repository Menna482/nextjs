"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";


interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function CategoriesSlider() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-10 container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{cat.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
