"use client";

import {
  LayoutDashboard,
  Settings,
  LogOut,
  Scan,
  CreditCard,
  Tag,
  Package,
  ChevronRight,
  Mail,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  {
    icon: <Scan size={20} />,
    label: "Scan Device",
    href: "/shpokeeper/scan-device",
    isSpecial: true,
  },
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard Overview",
    href: "/shpokeeper/dashboard",
  },
  {
    icon: <CreditCard size={20} />,
    label: "Payment",
    href: "/shpokeeper/payment",
    hasSubmenu: true,
  },
  {
    icon: <Tag size={20} />,
    label: "Pricing Plane",
    href: "/shpokeeper/pricing",
  },
  {
    icon: <Package size={20} />,
    label: "Inventory",
    href: "/shpokeeper/inventory",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    href: "/shpokeeper/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-white h-screen border-r border-gray-100 flex flex-col sticky top-0 font-poppins">
      {/* Logo */}
      <div className="p-8 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-0 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-6 py-4 bg-[#84CC16] text-white font-bold transition-all hover:bg-[#76b813]"
              >
                {item.icon}
                <span className="text-[15px]">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 transition-all group ${
                isActive ? "text-[#0F172A]" : "text-[#1E293B]"
              } hover:bg-gray-50`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`${isActive ? "text-[#0F172A]" : "text-[#1E293B]"}`}
                >
                  {item.icon}
                </span>
                <span className="text-[15px] font-semibold">{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <ChevronRight size={18} className="text-gray-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Support Section */}
      <div className="px-6 py-6 border-t border-gray-50 bg-gray-50/30">
        <h3 className="text-[15px] font-black text-[#0F172A] mb-4">Support</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-[#25D366]/10 rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#25D366]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[#64748B] group-hover:text-[#0F172A] transition">
              +447777787771
            </span>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-[#EA4335]/10 rounded-lg flex items-center justify-center">
              <Mail size={16} className="text-[#EA4335]" />
            </div>
            <span className="text-[14px] font-bold text-[#64748B] group-hover:text-[#0F172A] transition line-clamp-1">
              reports@imoscan.com
            </span>
          </div>
        </div>
      </div>

      {/* User Profile & Logout */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-[#0F172A] leading-tight">
              Demo Name
            </span>
            <span className="text-[13px] font-bold text-[#64748B]">
              Super Admin
            </span>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-red-100 text-[#EF4444] font-bold hover:bg-red-50 transition-all group">
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
