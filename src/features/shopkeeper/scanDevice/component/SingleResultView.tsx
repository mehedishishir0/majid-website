import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  ShieldCheck,
  Wallet,
  Lock,
  Cpu,
  FileText,
  Download,
  Loader2,
  Check,
  AlertTriangle,
} from "lucide-react";
import { IMEIResult } from "../../scanDevice/types/scanDevice.types";
import { ImeiReportDetails } from "./ImeiReportDetails";
import {
  CERTIFICATE_PDF_HEIGHT,
  CERTIFICATE_PDF_WIDTH,
  CertificatePDF,
} from "./CertificatePDF";
import {
  getChecksArray,
  getStatusColor,
  getTechnicalBreakdownItems,
} from "@/utils/resultHelpers";

interface SingleResultViewProps {
  scanResult: IMEIResult;
  singleReportMeta: { provider?: string; serviceId?: number } | null;
  selectedService?: {
    name?: string;
    serviceId?: number | null;
  } | null;
  onBack: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const getCheckIcon = (title?: string) => {
  switch (title) {
    case "Global Blacklist":
      return ShieldCheck;
    case "Carrier Financing":
      return Wallet;
    case "Hardware Lock":
      return Lock;
    case "Part Authenticity":
      return Cpu;
    default:
      return ShieldCheck;
  }
};

export const SingleResultView = ({
  scanResult,
  singleReportMeta,
  selectedService,
  onBack,
  onDownload,
  isDownloading,
}: SingleResultViewProps) => {
  const checksArray = getChecksArray(scanResult);
  const technicalItems = getTechnicalBreakdownItems(scanResult);

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto space-y-8 font-poppins">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] font-bold transition group cursor-pointer"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Scan another device
      </button>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-1">
                {scanResult.deviceName || "Unknown Device"}
              </h1>
              <p className="text-[#64748B] font-bold text-sm">
                IMEI: {scanResult.imei}
              </p>
            </div>
            <span
              className={`px-6 py-2 text-white text-[12px] font-black rounded-full uppercase tracking-widest shadow-lg ${getStatusColor(
                scanResult.deviceStatus || "",
              )}`}
            >
              {scanResult.deviceStatus || "Unknown"}
            </span>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                  Risk Meter
                </span>
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                  {scanResult.riskMeter?.score || 0}/100
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-1000"
                  style={{ width: `${scanResult.riskMeter?.score || 0}%` }}
                />
              </div>
              <p className="text-sm font-bold text-[#0F172A]">
                {scanResult.riskMeter?.label || "Risk Unknown"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">
                Market Value
              </p>
              <p className="text-3xl font-black text-[#0F172A]">
                ${scanResult.marketValue?.amount?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI Insight Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#F8FAFC] rounded-[32px] p-8 border border-gray-100 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Zap size={18} className="text-[#0F172A]" />
            </div>
            <span className="text-[12px] font-black text-[#0F172A] uppercase tracking-widest">
              {scanResult.aiInsight?.title || "AI INSIGHT"}
            </span>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex-1">
            <p className="text-[#64748B] text-[13px] font-semibold leading-relaxed italic">
              &quot;{scanResult.aiInsight?.message || "No insight available"}
              &quot;
            </p>
          </div>
        </motion.div>
      </div>

      {/* Check Cards & Report Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {checksArray.map((check, i) => {
            const Icon = getCheckIcon(check?.title);
            return (
              <motion.div
                key={check.title || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white rounded-[24px] p-6 border border-gray-100 flex items-center justify-between group hover:border-[#84CC16]/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      check.status === "passed"
                        ? "bg-[#84CC16]/10 text-[#84CC16]"
                        : check.status === "warning"
                          ? "bg-orange-50 text-orange-500"
                          : "bg-red-50 text-red-500"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0F172A]">
                      {check?.title || "Check"}
                    </h3>
                    <p className="text-[12px] font-medium text-[#64748B]">
                      {check?.description || "No description"}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    check.status === "passed"
                      ? "bg-[#84CC16] text-white"
                      : check.status === "warning"
                        ? "bg-orange-500 text-white"
                        : "bg-red-500 text-white"
                  }`}
                >
                  {check?.status === "passed" ? (
                    <Check size={14} strokeWidth={4} />
                  ) : (
                    <AlertTriangle size={14} strokeWidth={4} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[32px] p-8 border border-gray-100 space-y-4"
        >
          <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
            Report Actions
          </span>
          <div className="space-y-3">
            <button className="w-full py-4 rounded-xl border-2 border-[#84CC16] text-[#84CC16] font-black text-sm hover:bg-[#84CC16]/5 transition flex items-center justify-center gap-2 cursor-pointer">
              <FileText size={18} />
              Create Smart Invoice
            </button>
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="w-full py-4 rounded-xl bg-[#84CC16] text-white font-black text-sm hover:bg-[#76b813] transition shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
              {isDownloading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Download size={18} />
              )}
              {isDownloading ? "Generating..." : "Download PDF Certificate"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Technical Breakdown */}
      {technicalItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm"
        >
          <h2 className="text-xl font-black text-[#0F172A] mb-10">
            Technical Breakdown
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
            {technicalItems.map((item) => (
              <div key={item.label} className="space-y-2">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest block">
                  {item.label}
                </span>
                <p className="text-sm font-bold text-[#0F172A] truncate">
                  {item.value as string}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <ImeiReportDetails
          result={scanResult}
          caption="The scan response is organized into readable report fields for quick review."
          meta={{
            provider: singleReportMeta?.provider || selectedService?.name,
            serviceId:
              singleReportMeta?.serviceId ??
              selectedService?.serviceId ??
              undefined,
            message: "Single IMEI check completed successfully.",
          }}
        />
      </motion.div>

      {/* Hidden Certificate Container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "-10000px",
          width: `${CERTIFICATE_PDF_WIDTH}px`,
          minHeight: `${CERTIFICATE_PDF_HEIGHT}px`,
          backgroundColor: "white",
          pointerEvents: "none",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <CertificatePDF
          data={scanResult}
          id="certificate-pdf-single"
          providerName={singleReportMeta?.provider || selectedService?.name}
          serviceId={
            singleReportMeta?.serviceId ??
            selectedService?.serviceId ??
            undefined
          }
        />
      </div>
    </div>
  );
};
