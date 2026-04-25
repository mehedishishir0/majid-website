"use client";

import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    href: "/shopkeeper/dashboard",
  },
  { icon: <Box size={20} />, label: "Services", href: "/shopkeeper/services" },
  {
    icon: <ShoppingCart size={20} />,
    label: "Orders",
    href: "/shopkeeper/orders",
  },
  {
    icon: <BarChart3 size={20} />,
    label: "Analytics",
    href: "/shopkeeper/analytics",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    href: "/shopkeeper/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white h-screen border-r border-gray-100 flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-8 mb-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#84CC16] tracking-tighter">
            imoscan
          </span>
          <ShieldCheck className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6] text-white" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                isActive
                  ? "bg-[#F0FDF4] text-[#84CC16]"
                  : "text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A]"
              }`}
            >
              {item.icon}
              <span className="text-sm tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-[#EF4444] hover:bg-red-50 transition-all w-full group">
          <LogOut
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </aside>
  );
}
