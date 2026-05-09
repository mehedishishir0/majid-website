import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImeiReportDetails } from "./ImeiReportDetails";
import { CertificatePDF } from "./CertificatePDF";
import {
  BatchImeiResponse,
  IMEIResult,
} from "../../scanDevice/types/scanDevice.types";
import { CERTIFICATE_PDF_WIDTH } from "@/utils/constants";

interface BulkResultViewProps {
  batchResult: BatchImeiResponse | null;
  onClear: () => void;
  onDownloadCertificate: (
    elementIds: string[],
    filename: string,
  ) => Promise<void>;
  isDownloading: boolean;
}

export const BulkResultView = ({
  batchResult,
  onClear,
  onDownloadCertificate,
  isDownloading,
}: BulkResultViewProps) => {
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

  if (!batchResult) return null;

  const batchRows = Array.isArray(batchResult.data) ? batchResult.data : [];
  const successfulBatchRows = batchRows.filter(
    (row): row is typeof row & { data: IMEIResult } =>
      Boolean(row.ok && row.data),
  );
  const selectedBatchRow = batchRows[selectedBatchIndex] ?? null;

  const handleDownloadSelectedBulkCertificate = () => {
    if (!selectedBatchRow?.ok || !selectedBatchRow.data) return;
    onDownloadCertificate(
      [`certificate-pdf-bulk-${selectedBatchIndex}`],
      `Certificate_${selectedBatchRow.imei}.pdf`,
    );
  };

  const handleDownloadAllBulkCertificates = () => {
    if (successfulBatchRows.length === 0) return;
    onDownloadCertificate(
      successfulBatchRows.map(
        (_, index) => `certificate-pdf-bulk-success-${index}`,
      ),
      `Bulk_IMEI_Certificates_${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-gray-100 bg-white p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#84CC16]">
              Reports
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-black text-[#0F172A]">
              Bulk IMEI Scan Results
            </h2>
            <p className="mt-2 text-sm font-medium text-[#64748B] max-w-2xl">
              Results are rendered directly on this page and organized one at a
              time for easier review.
            </p>
          </div>

          <button
            onClick={onClear}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-[#64748B] transition hover:bg-gray-50 hover:text-[#0F172A]"
          >
            Clear Results
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-5 w-5 text-slate-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                Total
              </span>
            </div>
            <p className="mt-3 text-2xl font-black text-slate-900">
              {batchResult.summary?.total ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-lime-100 bg-lime-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-lime-700">
                Success
              </span>
            </div>
            <p className="mt-3 text-2xl font-black text-lime-700">
              {batchResult.summary?.successCount ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-red-600">
                Failed
              </span>
            </div>
            <p className="mt-3 text-2xl font-black text-red-600">
              {batchResult.summary?.failedCount ?? 0}
            </p>
          </div>
        </div>

        {/* Download All Button */}
        {successfulBatchRows.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDownloadAllBulkCertificates}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#84CC16] px-5 py-3 text-sm font-black text-white transition hover:bg-[#76b813] disabled:cursor-wait disabled:opacity-70"
            >
              {isDownloading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              Download All Certificates
            </button>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-6 rounded-[28px] border border-gray-100 bg-[#F8FAFC] p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#94A3B8]">
                Navigate Results
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#64748B]">
                Use the selector or next and previous controls to inspect each
                IMEI report.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
              <Select
                value={String(selectedBatchIndex)}
                onValueChange={(value) => setSelectedBatchIndex(Number(value))}
              >
                <SelectTrigger className="w-full min-w-[260px] rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Select a result" />
                </SelectTrigger>
                <SelectContent>
                  {batchRows.map((row, index) => (
                    <SelectItem
                      key={`${row.rowNumber}-${row.imei}-${index}`}
                      value={String(index)}
                    >
                      {`Row ${row.rowNumber} - ${row.imei}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                onClick={() =>
                  setSelectedBatchIndex((current) => Math.max(current - 1, 0))
                }
                disabled={selectedBatchIndex === 0}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>

              <button
                onClick={() =>
                  setSelectedBatchIndex((current) =>
                    Math.min(current + 1, batchRows.length - 1),
                  )
                }
                disabled={selectedBatchIndex === batchRows.length - 1}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selected Result Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {selectedBatchRow?.ok && selectedBatchRow.data ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={handleDownloadSelectedBulkCertificate}
                disabled={isDownloading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-[#0F172A] transition hover:bg-gray-50 disabled:cursor-wait disabled:opacity-70"
              >
                {isDownloading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                Download This Certificate
              </button>
            </div>
            <ImeiReportDetails
              result={selectedBatchRow.data}
              caption="Provider data is used as the primary source and organized into a clean report."
              meta={{
                provider: selectedBatchRow.provider,
                serviceId: selectedBatchRow.serviceId,
                cached: selectedBatchRow.cached,
                message: selectedBatchRow.message,
                rowNumber: selectedBatchIndex + 1,
                totalRows: batchRows.length,
              }}
            />
          </div>
        ) : selectedBatchRow ? (
          <div className="rounded-[32px] border border-red-100 bg-red-50 p-8 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
              Failed Result
            </p>
            <h3 className="mt-2 text-2xl font-black text-red-700">
              Row {selectedBatchRow.rowNumber} could not be processed
            </h3>
            <p className="mt-3 text-sm font-semibold text-red-600">
              {selectedBatchRow.message}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-red-100 bg-white px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-red-400">
                  Row
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {selectedBatchRow.rowNumber}
                </p>
              </div>
              <div className="rounded-2xl border border-red-100 bg-white px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-red-400">
                  IMEI
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900 break-all">
                  {selectedBatchRow.imei}
                </p>
              </div>
              <div className="rounded-2xl border border-red-100 bg-white px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-red-400">
                  Service ID
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {selectedBatchRow.serviceId ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>

      {/* Hidden Certificate Containers for Bulk */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "-10000px",
          width: `${CERTIFICATE_PDF_WIDTH}px`,
          pointerEvents: "none",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        {successfulBatchRows.map((row, index) => (
          <CertificatePDF
            key={`bulk-certificate-${row.rowNumber}-${row.imei}-${index}`}
            data={row.data}
            id={`certificate-pdf-bulk-success-${index}`}
            providerName={row.provider}
            serviceId={row.serviceId}
          />
        ))}
        {selectedBatchRow?.ok && selectedBatchRow.data && (
          <CertificatePDF
            key={`selected-bulk-certificate-${selectedBatchIndex}`}
            data={selectedBatchRow.data}
            id={`certificate-pdf-bulk-${selectedBatchIndex}`}
            providerName={selectedBatchRow.provider}
            serviceId={selectedBatchRow.serviceId}
          />
        )}
      </div>
    </div>
  );
};
