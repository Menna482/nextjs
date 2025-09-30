"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { ResetPasswordSchema } from "../schema/ResetPasswordSchema";
import z from "zod";

export default function ResetPassword() {
  const router = useRouter(); // ✅ صح
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur",
  });

  async function handleRegister(values: z.infer<typeof ResetPasswordSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.token) {
        toast.success("Password reset successfully");
        router.push("/login");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Reset Password</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            {...register("newPassword")} // ✅ صح
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
