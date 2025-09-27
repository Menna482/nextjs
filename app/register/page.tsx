"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string(),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });


  async function onSubmit(formData: RegisterSchema) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Account created successfully 🎉");
        setTimeout(() => {
          router.push("/login"); // 🟢 يوديه على صفحة تسجيل الدخول
        }, 1500);
      } else {
        setErrMsg(data.message || "Registration failed ❌");
      }
    } catch (err) {
      setErrMsg("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

  
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

       
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

       
        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

    
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

      
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("rePassword")}
            className="w-full border p-2 rounded"
          />
          {errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rePassword.message}
            </p>
          )}
        </div>


        {errMsg && <p className="text-red-500 mb-3">{errMsg}</p>}
        {successMsg && <p className="text-green-500 mb-3">{successMsg}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
