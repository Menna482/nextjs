"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ForgetSchema } from "../schema/ForgetSchema";
import z from "zod";

export default function ForgetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ForgetSchema>>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetSchema),
    mode: "onBlur",
  });

  async function handleForget(values: z.infer<typeof ForgetSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);

      if (data.statusMsg === "success") {
        toast.success("Email sent successfully");
        router.push("/reset-code");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit(handleForget)} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Send Email</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
