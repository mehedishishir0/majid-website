import { useEffect } from "react";
import {
  IMEIResult,
  BatchImeiResponse,
} from "../../scanDevice/types/scanDevice.types";

const LAST_REPORT_STORAGE_KEY = "imoscan:last-report:v1";

type PersistedReportState = {
  version: 1;
  mode: "single" | "bulk";
  savedAt: string;
  singleResult?: IMEIResult | null;
  singleMeta?: { provider?: string; serviceId?: number };
  batchResult?: BatchImeiResponse | null;
  selectedBatchIndex?: number;
};

export const usePersistedReport = (
  scanResult: IMEIResult | null,
  batchResult: BatchImeiResponse | null,
  selectedBatchIndex: number,
  singleReportMeta: { provider?: string; serviceId?: number } | null,
  onRestore: (state: PersistedReportState) => void,
) => {
  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(LAST_REPORT_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as PersistedReportState;
      if (!parsed || parsed.version !== 1) return;

      onRestore(parsed);
    } catch (error) {
      console.error("Failed to restore last IMEI report:", error);
      window.localStorage.removeItem(LAST_REPORT_STORAGE_KEY);
    }
  }, [onRestore]);

  // Save single result to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !scanResult) return;

    const payload: PersistedReportState = {
      version: 1,
      mode: "single",
      savedAt: new Date().toISOString(),
      singleResult: scanResult,
      singleMeta: singleReportMeta ?? undefined,
    };

    window.localStorage.setItem(
      LAST_REPORT_STORAGE_KEY,
      JSON.stringify(payload),
    );
  }, [scanResult, singleReportMeta]);

  // Save batch result to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !batchResult) return;

    const payload: PersistedReportState = {
      version: 1,
      mode: "bulk",
      savedAt: new Date().toISOString(),
      batchResult,
      selectedBatchIndex,
    };

    window.localStorage.setItem(
      LAST_REPORT_STORAGE_KEY,
      JSON.stringify(payload),
    );
  }, [batchResult, selectedBatchIndex]);
};
