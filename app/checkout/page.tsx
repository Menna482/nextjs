
"use client";

import { useFormik } from "formik";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const { cashOnDelivery, onlinePayment } = useCart();
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.details) errors.details = "Required";
      if (!values.phone) {
        errors.phone = "Required";
      } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
        errors.phone = "Invalid Egyptian phone number format";
      }
      if (!values.city) errors.city = "Required";
      return errors;
    },
    onSubmit: async (values) => {
      setIsCallingAPI(true);
      try {
        if (isOnline) {
        
          const session = await onlinePayment(values);
          if (session?.session?.url) {
            window.location.href = session.session.url;
          }
        } else {
      
          await cashOnDelivery(values);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order placed successfully with Cash on Delivery!",
            showConfirmButton: false,
            timer: 2000,
          });
          router.push("/"); 
        }
      } catch (error) {
        console.error("Checkout failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      } finally {
        setIsCallingAPI(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4 mx-auto my-6 bg-white rounded-lg shadow-md md:max-w-6xl sm:max-w-2xl"
    >
      <h1 className="text-3xl text-[#212529] mb-10">Checkout Now</h1>

      <div className="mb-5">
        <label htmlFor="details" className="block mb-2 text-sm font-medium">
          Details
        </label>
        <input
          type="text"
          id="details"
          name="details"
          placeholder="Enter your details"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.details}
          className="w-full p-2.5 border rounded-lg"
        />
        {formik.errors.details && formik.touched.details && (
          <p className="mt-2 text-sm text-red-600">{formik.errors.details}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium">
          Phone No.
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="w-full p-2.5 border rounded-lg"
        />
        {formik.errors.phone && formik.touched.phone && (
          <p className="mt-2 text-sm text-red-600">{formik.errors.phone}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="city" className="block mb-2 text-sm font-medium">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter your City"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.city}
          className="w-full p-2.5 border rounded-lg"
        />
        {formik.errors.city && formik.touched.city && (
          <p className="mt-2 text-sm text-red-600">{formik.errors.city}</p>
        )}
      </div>

      {isCallingAPI ? (
        <div className="flex justify-center">
          <ClipLoader />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className={`px-5 py-2.5 rounded-lg text-white text-sm ${
              !(formik.isValid && formik.dirty)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Checkout Now
          </button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="online"
              checked={isOnline}
              onChange={() => setIsOnline(!isOnline)}
              className="mr-2"
            />
            <label htmlFor="online">Online Payment</label>
          </div>
        </div>
      )}
    </form>
  );
}

