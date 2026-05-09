/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { checkIMEIApi } from "../../scanDevice/api/scanDevice.api";
import {
  IMEIResult,
  BatchImeiResponse,
} from "../../scanDevice/types/scanDevice.types";

export const useScanDevice = () => {
  const [imei, setImei] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<IMEIResult | null>(null);
  const [batchResult, setBatchResult] = useState<BatchImeiResponse | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [singleReportMeta, setSingleReportMeta] = useState<{
    provider?: string;
    serviceId?: number;
  } | null>(null);

  const handleScan = useCallback(
    async (imeiToScan: string, serviceId: number, onComplete?: () => void) => {
      if (!imeiToScan || !serviceId) return;

      setIsScanning(true);
      setScanResult(null);
      setBatchResult(null);
      setError(null);
      setCurrentStep(1);

      try {
        setTimeout(() => setCurrentStep(2), 1500);
        setTimeout(() => setCurrentStep(3), 3000);

        const response = await checkIMEIApi(imeiToScan, serviceId);

        if (response.success && response.data) {
          const responseData = response.data;
          let imeiResult: IMEIResult | null = null;

          if (Array.isArray(responseData) && responseData.length > 0) {
            const firstItem = responseData[0];
            if (firstItem.ok && firstItem.data) {
              imeiResult = firstItem.data;
            }
          } else if (
            responseData &&
            typeof responseData === "object" &&
            !Array.isArray(responseData)
          ) {
            if ("ok" in responseData && "data" in responseData) {
              imeiResult = (responseData as any).data;
            } else {
              imeiResult = responseData as IMEIResult;
            }
          }

          if (imeiResult) {
            setTimeout(() => {
              setScanResult(imeiResult);
              setSingleReportMeta({ serviceId });
              setIsScanning(false);
              onComplete?.();
            }, 4500);
          } else {
            setError("No valid IMEI data received");
            setIsScanning(false);
          }
        } else {
          setError(response.message || "Failed to check IMEI");
          setIsScanning(false);
        }
      } catch (err: unknown) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        setError(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong",
        );
        setIsScanning(false);
      }
    },
    [],
  );

  const clearResults = () => {
    setScanResult(null);
    setBatchResult(null);
    setSingleReportMeta(null);
    setError(null);
    setCurrentStep(0);
  };

  return {
    imei,
    setImei,
    isScanning,
    scanResult,
    batchResult,
    setBatchResult,
    currentStep,
    error,
    singleReportMeta,
    handleScan,
    clearResults,
  };
};
