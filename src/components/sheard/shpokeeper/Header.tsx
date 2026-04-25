"use client";

import { Search, Bell, ChevronDown, UserCircle2, Plus } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#84CC16] transition"
            size={18}
          />
          <input
            type="text"
            placeholder="Search orders, IMEI, reports..."
            className="w-full bg-gray-50 border border-transparent focus:border-[#84CC16] focus:bg-white px-12 py-2.5 rounded-2xl outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Quick Check Button */}
        <button className="hidden md:flex items-center gap-2 bg-[#84CC16] hover:bg-[#6fa512] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-lime-500/20 transition-all transform hover:scale-105 active:scale-95">
          <Plus size={18} />
          Quick Check IMEI
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 bg-gray-50 text-[#64748B] rounded-2xl hover:bg-gray-100 transition group">
          <Bell
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-black text-[#0F172A] leading-none mb-1 group-hover:text-[#84CC16] transition">
              Shop Master
            </p>
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              Store Owner
            </p>
          </div>
          <div className="relative h-10 w-10 rounded-2xl overflow-hidden ring-2 ring-gray-50">
            <Image
              src="https://i.pravatar.cc/150?u=shop"
              alt="Profile"
              width={40}
              height={40}
            />
          </div>
          <ChevronDown
            size={16}
            className="text-gray-400 group-hover:text-[#0F172A] transition"
          />
        </div>
      </div>
    </header>
  );
}
