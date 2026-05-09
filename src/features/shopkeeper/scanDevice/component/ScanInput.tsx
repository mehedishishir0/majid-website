import { QrCode } from "lucide-react";

interface ScanInputProps {
  imei: string;
  setImei: (value: string) => void;
  onScanClick: () => void;
  disabled?: boolean;
}

export const ScanInput = ({
  imei,
  setImei,
  onScanClick,
  disabled,
}: ScanInputProps) => {
  return (
    <div className="relative group">
      <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-4">
        Device Identifier
      </span>
      <input
        type="text"
        placeholder="Enter IMEI / Serial Number"
        value={imei}
        onChange={(e) => setImei(e.target.value)}
        disabled={disabled}
        className="w-full px-8 py-3 rounded-full border border-gray-100 bg-[#FBFBFB] focus:border-[#84CC16] focus:bg-white focus:ring-4 focus:ring-[#84CC16]/5 outline-none transition-all text-lg font-semibold text-[#0F172A] placeholder:text-gray-400 disabled:opacity-50"
      />
      <button
        onClick={onScanClick}
        disabled={disabled}
        title="Scan Barcode/QR"
        className="absolute right-6 top-[70%] -translate-y-1/2 p-2 text-gray-400 hover:text-[#84CC16] hover:bg-[#84CC16]/5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
      >
        <QrCode size={24} />
      </button>
    </div>
  );
};
