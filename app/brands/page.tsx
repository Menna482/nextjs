import Image from "next/image";

type Brand = {
  _id: string;
  name: string;
  image: string;
};

export default async function BrandsPage() {
  let brands: Brand[] = [];

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await res.json();
    brands = data.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
  }

  return (
    <div className="py-10 container mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Shop by Brand</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div
              key={brand._id}
              className="border rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition bg-white"
            >
              <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={200}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="p-3 text-center bg-white">
                <p className="text-green-700 font-semibold text-lg">
                  {brand.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No brands found.
          </p>
        )}
      </div>
    </div>
  );
}
