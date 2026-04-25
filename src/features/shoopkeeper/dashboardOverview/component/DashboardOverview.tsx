"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  CircleX,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";

const stats = [
  {
    label: "Total Checks",
    value: "1,284",
    icon: <ShieldCheck className="text-blue-500" />,
    change: "+12%",
    color: "bg-blue-50",
  },
  {
    label: "Successful",
    value: "1,156",
    icon: <Zap className="text-green-500" />,
    change: "+8%",
    color: "bg-green-50",
  },
  {
    label: "Blacklisted",
    value: "128",
    icon: <CircleX className="text-red-500" />,
    change: "-2%",
    color: "bg-red-50",
  },
  {
    label: "Balance",
    value: "$240.00",
    icon: <Wallet className="text-purple-500" />,
    change: "Refill",
    color: "bg-purple-50",
  },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-10">
      {/* Welcome Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black text-[#0F172A] mb-2"
        >
          Welcome back, <span className="text-[#84CC16]">Shop Master!</span>
        </motion.h1>
        <p className="text-[#64748B] font-medium">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                  stat.change.includes("+")
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#64748B] mb-1">
              {stat.label}
            </h3>
            <p className="text-2xl font-black text-[#0F172A] tracking-tight">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-[#0F172A]">
              Recent Activity
            </h2>
            <button className="text-sm font-bold text-[#84CC16] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-50">
                  <th className="pb-4 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                    Device
                  </th>
                  <th className="pb-4 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                    IMEI
                  </th>
                  <th className="pb-4 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                    Status
                  </th>
                  <th className="pb-4 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest text-right">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    device: "iPhone 15 Pro",
                    imei: "354289******123",
                    status: "Clean",
                    date: "2 mins ago",
                  },
                  {
                    device: "Samsung S24 Ultra",
                    imei: "982173******845",
                    status: "Blacklisted",
                    date: "1 hour ago",
                  },
                  {
                    device: "MacBook Pro M3",
                    imei: "C02F******X9",
                    status: "Clean",
                    date: "3 hours ago",
                  },
                  {
                    device: "Google Pixel 8",
                    imei: "357129******442",
                    status: "Clean",
                    date: "Yesterday",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 font-bold text-[#0F172A] text-sm">
                      {row.device}
                    </td>
                    <td className="py-4 text-[#64748B] text-sm font-medium">
                      {row.imei}
                    </td>
                    <td className="py-4">
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                          row.status === "Clean"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-[#94A3B8] text-[11px] font-bold text-right">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / Tips Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0F172A] rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={120} />
          </div>

          <div>
            <h2 className="text-xl font-black mb-4">Improve Sales with AI</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Detailed AI-powered device reports increase customer trust by up
              to 40%. Start using them today.
            </p>
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition cursor-pointer group"
                >
                  <span className="text-sm font-bold">New Marketing Kit</span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#84CC16] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-8 bg-[#84CC16] hover:bg-[#6fa512] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-lime-500/10">
            Upgrade Account
          </button>
        </motion.div>
      </div>
    </div>
  );
}
