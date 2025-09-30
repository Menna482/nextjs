
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ResetSchema } from "../schema/ResetSchema";
import z from "zod";

export default function ForgetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(ResetSchema),
    mode: "onBlur",
  });


  const codeDigits = watch("resetCode")?.split("") || Array(6).fill("");

  const handleChange = (index: number, value: string) => {
    const newCode = [...codeDigits];
    newCode[index] = value.slice(-1); 
    setValue("resetCode", newCode.join(""), { shouldValidate: true });
  };

  async function handlelReset(values: z.infer<typeof ResetSchema>) {
    console.log(values);
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.status === "Success") {
        toast.success(" Code verified successfully");
        router.push("/reset-password");
        console.log(data);
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(handlelReset)}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-center">
            Enter 6-digit Reset Code
          </label>

          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={codeDigits[i] || ""}
                onChange={(e) => handleChange(i, e.target.value)}
                className={`w-12 h-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.resetCode ? "border-red-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {errors.resetCode && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errors.resetCode.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

