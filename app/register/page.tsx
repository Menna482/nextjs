"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/RegisterSchema";
import { registerApi } from "../services/AuthService";
import z from "zod";
import { Route, Router } from "lucide-react";
import { toast } from "sonner";



export default function RegisterPage() {
  const Route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
  phone:"",
      gender: "male",
    },
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  async function handleRegister(values: z.infer<typeof registerSchema>) {
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
      method:"POST",
      body:JSON.stringify(values),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data= await res.json()
    console.log(data);
    if(data.message==="success"){
      toast.success("Registered successfully");
      Route.push("/login")
    }else{
      toast.error(data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("rePassword")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.rePassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>
          )}
        </div>

       {/* Phone */}       
        <div className="mb-4">
          <label className="block mb-1 font-medium">phone</label>
          <input 
            type="text"
            {...register("phone")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>


       
        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {/* Error / Success Messages */}
        {errMsg && <p className="mt-4 text-red-600 text-center">{errMsg}</p>}
        {successMsg && <p className="mt-4 text-green-600 text-center">{successMsg}</p>}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 underline">
            Login now
          </a>
        </p>
      </form>
    </div>
  );
}
