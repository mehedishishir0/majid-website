"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[40px] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-gray-100"
      >
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#0F172A] mb-3">
            Welcome Back
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Enter your credentials to manage your account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-[#84CC16] focus:ring-4 focus:ring-[#84CC16]/10 outline-none transition-all text-[#1E293B] placeholder:text-gray-400 font-medium"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-[#84CC16] focus:ring-4 focus:ring-[#84CC16]/10 outline-none transition-all text-[#1E293B] placeholder:text-gray-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#84CC16] transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-[#84CC16] focus:ring-[#84CC16] transition cursor-pointer"
              />
              <span className="text-sm font-bold text-[#64748B] group-hover:text-[#0F172A] transition">
                Remember me
              </span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-black text-[#1E293B] hover:text-[#84CC16] transition underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>

          <button className="w-full bg-[#84CC16] hover:bg-[#6fa512] text-white font-black py-4 rounded-full shadow-lg shadow-lime-500/20 transition-all transform hover:scale-[1.02] active:scale-95 text-lg">
            Log in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-10 text-sm font-bold text-[#64748B]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-[#0F172A] hover:text-[#84CC16] transition border-b-2 border-transparent hover:border-[#84CC16]"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
