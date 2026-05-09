import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  ServiceCategory,
  IMEIService,
} from "../../scanDevice/types/scanDevice.types";

interface ServiceSelectorProps {
  serviceCategories: ServiceCategory[];
  selectedService: IMEIService | null;
  setSelectedService: (service: IMEIService) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  disabled?: boolean;
}

export const ServiceSelector = ({
  serviceCategories,
  selectedService,
  setSelectedService,
  isDropdownOpen,
  setIsDropdownOpen,
  disabled,
}: ServiceSelectorProps) => {
  return (
    <div className="relative">
      <span className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3 block ml-4">
        Select Diagnostic Service
      </span>

      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled}
        className="w-full flex items-center justify-between px-8 py-2 rounded-3xl border dark:bg-white hover:border-[#84CC16]/30 transition-all cursor-pointer group disabled:opacity-50"
      >
        <div className="flex flex-col items-start">
          <span className="text-lg font-black text-[#0F172A] group-hover:text-[#84CC16] transition-colors">
            {selectedService ? selectedService.name : "Select Service"}
          </span>
          {selectedService && (
            <span className="text-[12px] font-bold text-[#84CC16]">
              Price: {selectedService.priceLabel}
            </span>
          )}
        </div>
        <ChevronDown
          size={24}
          className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 right-0 mt-4 bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden z-[100] max-h-[400px] overflow-y-auto custom-scrollbar p-3"
          >
            {serviceCategories.map((cat) => (
              <div key={cat.category} className="mb-4 last:mb-0">
                <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">
                  {cat.category}
                </div>
                {cat.services.map((svc) => (
                  <button
                    key={svc._id}
                    onClick={() => {
                      setSelectedService(svc);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex flex-col items-start p-4 rounded-2xl transition-all mb-1 ${
                      selectedService?._id === svc._id
                        ? "bg-[#84CC16]/10 border-2 border-[#84CC16]/20"
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <span
                      className={`text-[15px] font-black text-left ${
                        selectedService?._id === svc._id
                          ? "text-[#84CC16]"
                          : "text-[#0F172A]"
                      }`}
                    >
                      {svc.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Price:
                      </span>
                      <span className="text-[12px] font-black text-[#84CC16]">
                        {svc.priceLabel}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
