import Image from "next/image";

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    categories = data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="py-10 container mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="border rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition bg-white"
            >
              <div className="w-full h-72 bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center bg-white">
                <p className="text-green-700 font-semibold text-lg">
                  {cat.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No categories found.
          </p>
        )}
      </div>
    </div>
  );
}
