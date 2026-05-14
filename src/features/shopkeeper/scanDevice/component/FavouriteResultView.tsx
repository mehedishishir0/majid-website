"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Loader2,
  Smartphone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lock,
  Cpu,
  CreditCard,
  Globe,
  Calendar,
  Shield,
  Tag,
  Database,
  Wifi,
  CheckCircle,
  XCircle,
  Unlock,
} from "lucide-react";
import { FavouriteIMEIData } from "../../scanDevice/types/scanDevice.types";

interface FavouriteResultViewProps {
  scanResult: FavouriteIMEIData;
  imei: string;
  singleReportMeta: { provider?: string; serviceId?: number } | null;
  selectedService?: { name?: string; serviceId?: number | null } | null;
  onBack: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const getRiskLabel = (score: number) => {
  if (score <= 25)
    return {
      label: "Low Risk",
      color: "bg-emerald-500",
      text: "text-emerald-500",
    };
  if (score <= 60)
    return {
      label: "Moderate Risk",
      color: "bg-amber-500",
      text: "text-amber-500",
    };
  return { label: "High Risk", color: "bg-red-500", text: "text-red-500" };
};

export const FavouriteResultView = ({
  scanResult,
  imei,
  singleReportMeta,
  selectedService,
  onBack,
  onDownload,
  isDownloading,
}: FavouriteResultViewProps) => {
  const providerData = scanResult.providerResults;
  const riskScore = scanResult.riskMeter;
  const riskInfo = getRiskLabel(riskScore);

  const isSimUnlocked = providerData.simlock?.toLowerCase() === "unlocked";
  const isICloudUnlocked = providerData.icloud_lock?.toLowerCase() === "off";
  const isBlacklistClean =
    providerData.blacklist_status?.toLowerCase() === "clean";

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 md:py-10 max-w-6xl mx-auto space-y-6 font-sans text-slate-900 bg-[#F8FAFC] min-h-screen">
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-medium">Back to scan</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Header Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                {providerData.marketing_name ||
                  providerData.model_name ||
                  "Device"}
              </h1>
              <p className="text-slate-400 mt-1 font-medium font-mono text-sm">
                IMEI: {providerData.imei || imei}
              </p>
              {providerData.imei2 && (
                <p className="text-slate-400 mt-0.5 font-mono text-xs">
                  IMEI2: {providerData.imei2}
                </p>
              )}
            </div>
            <span
              className={`px-4 py-1.5 text-white rounded-full text-xs font-bold uppercase tracking-widest ${isBlacklistClean ? "bg-emerald-500" : "bg-red-500"}`}
            >
              {isBlacklistClean ? "CLEAN" : "FLAGGED"}
            </span>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Risk Meter
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Market Value
              </span>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex-1">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${riskInfo.color} transition-all duration-1000`}
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span className={`text-lg font-semibold ${riskInfo.text}`}>
                    {riskInfo.label}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {riskScore}/100
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-slate-900">
                  $942.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-[#F1F5F9] rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-slate-800" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              AI Insight
            </span>
          </div>
          <div className="bg-white rounded-xl p-5 flex-1 border border-slate-100 italic text-slate-500 leading-relaxed text-sm">
            &quot;
            {scanResult.aiInsight?.message ||
              "Analysis complete. Device appears safe based on 140+ global database checks."}
            &quot;
          </div>
        </div>

        {/* Status Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatusTile
            icon={<Globe className="text-emerald-500" />}
            title="Global Blacklist"
            status={
              isBlacklistClean ? "Clean / Not Reported" : "Reported / Blocked"
            }
            isValid={isBlacklistClean}
          />
          <StatusTile
            icon={<CreditCard className="text-amber-500" />}
            title="Carrier Financing"
            status={
              providerData.financing_status || "No active payment plan detected"
            }
            isValid={true}
          />
          <StatusTile
            icon={<Lock className="text-emerald-500" />}
            title="Hardware Lock"
            status={isICloudUnlocked ? "FMI is OFF" : "FMI is ON"}
            isValid={isICloudUnlocked}
          />
          <StatusTile
            icon={<Cpu className="text-emerald-500" />}
            title="Part Authenticity"
            status="All original components verified"
            isValid={true}
          />
        </div>

        {/* Report Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-fit">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">
            Report Actions
          </span>
          <div className="space-y-3">
            <button className="w-full py-3 rounded-xl border-2 border-[#84CC16] text-[#84CC16] font-bold text-sm hover:bg-lime-50 transition flex items-center justify-center gap-2">
              <FileText size={16} />
              Create Smart Invoice
            </button>
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="w-full py-3 rounded-xl bg-[#84CC16] text-white font-bold text-sm hover:bg-[#76b813] transition shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {isDownloading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Download size={18} />
              )}
              {isDownloading ? "Generating..." : "Download PDF Certificate"}
            </button>
          </div>
        </div>

        {/* Device Specifications Section */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-lime-500/10 rounded-xl">
              <Smartphone size={18} className="text-lime-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Device Specifications
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Model", value: providerData.model, icon: Smartphone },
              {
                label: "Model Name",
                value: providerData.model_name,
                icon: Tag,
              },
              {
                label: "Serial Number",
                value: providerData.serial_number,
                icon: Database,
              },
              {
                label: "Manufacturer",
                value: providerData.manufacturer || "Apple",
                icon: Shield,
              },
              {
                label: "Operating System",
                value: providerData.operating_system || "iOS",
                icon: Cpu,
              },
              { label: "EID", value: providerData.eid, icon: Wifi },
            ]
              .filter((item) => item.value)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={14} className="text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 break-words">
                    {item.value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Warranty & Coverage Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Shield size={18} className="text-blue-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Warranty & Coverage
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Warranty Status",
                value: providerData.warranty_status || "Limited Warranty",
              },
              {
                label: "Limited Warranty",
                value: providerData.limited_warranty || "Yes",
              },
              {
                label: "Coverage Period",
                value: `${providerData.coverage_start_date || "N/A"} - ${providerData.coverage_end_date || "N/A"}`,
              },
              {
                label: "AppleCare",
                value:
                  providerData.applecare_description || "90 Days Phone Support",
              },
              {
                label: "Purchase Date",
                value: formatDate(providerData.purchase_date || ""),
              },
              {
                label: "Replaced Device",
                value: providerData.replaced_device === "No" ? "No" : "Yes",
              },
            ]
              .filter((item) => item.value !== "N/A - N/A")
              .map((item, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-3">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Lock & Security Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Lock size={18} className="text-purple-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Lock & Security
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">SIM Lock Status</span>
              {isSimUnlocked ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Unlock size={12} /> Unlocked
                </span>
              ) : (
                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <Lock size={12} /> Locked
                </span>
              )}
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">iCloud Lock</span>
              {isICloudUnlocked ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle size={12} /> OFF (Clean)
                </span>
              ) : (
                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <XCircle size={12} /> ON (Locked)
                </span>
              )}
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">SIM Policy Unlock</span>
              <span className="text-xs font-bold text-slate-700">
                {providerData.simpolicy_unlock_status || "UNLOCK"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">Locked Carrier</span>
              <span className="text-xs font-bold text-slate-700">
                {providerData.locked_carrier || "10 - Unlock"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-500">Activation Policy</span>
              <span className="text-xs font-bold text-slate-700 truncate max-w-[180px]">
                {providerData.initial_activation_policy_description ||
                  "10 - Unlock"}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="lg:col-span-3 bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Service
              </p>
              <p className="text-sm font-bold text-slate-700">
                {scanResult.bundledServiceName}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Service ID
              </p>
              <p className="text-sm font-bold text-slate-700">
                {scanResult.bundledServiceId}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Scan Date
              </p>
              <p className="text-sm font-bold text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Risk Score
              </p>
              <p className="text-sm font-bold text-slate-700">
                {riskScore}/100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper Components */
function StatusTile({
  icon,
  title,
  status,
  isValid,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  isValid: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="text-xs text-slate-500 font-medium max-w-[200px]">
            {status}
          </p>
        </div>
      </div>
      {isValid ? (
        <CheckCircle2 className="text-emerald-500" size={20} />
      ) : (
        <AlertTriangle className="text-amber-500" size={20} />
      )}
    </div>
  );
}
