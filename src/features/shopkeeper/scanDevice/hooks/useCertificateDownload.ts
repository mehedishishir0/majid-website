import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  CERTIFICATE_PDF_HEIGHT,
  CERTIFICATE_PDF_WIDTH,
} from "@/utils/constants";

export const useCertificateDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCertificatePdf = useCallback(
    async (elementIds: string[], filename: string) => {
      if (elementIds.length === 0) return;
      setIsDownloading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 400));

        const styleSheets = Array.from(
          document.querySelectorAll("style, link[rel='stylesheet']"),
        ) as (HTMLStyleElement | HTMLLinkElement)[];
        const originalMedias = styleSheets.map((s) => s.media || "");

        styleSheets.forEach((s) => (s.media = "none"));

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [CERTIFICATE_PDF_WIDTH, CERTIFICATE_PDF_HEIGHT],
        });

        try {
          for (let index = 0; index < elementIds.length; index += 1) {
            const element = document.getElementById(elementIds[index]);
            if (!element) {
              throw new Error(
                `Certificate element "${elementIds[index]}" not found`,
              );
            }

            const canvas = await html2canvas(element, {
              scale: 2,
              useCORS: true,
              logging: false,
              backgroundColor: "#ffffff",
              width: CERTIFICATE_PDF_WIDTH,
              height: CERTIFICATE_PDF_HEIGHT,
            });

            const imgData = canvas.toDataURL("image/png", 1.0);

            if (index > 0) {
              pdf.addPage(
                [CERTIFICATE_PDF_WIDTH, CERTIFICATE_PDF_HEIGHT],
                "portrait",
              );
            }

            pdf.addImage(
              imgData,
              "PNG",
              0,
              0,
              CERTIFICATE_PDF_WIDTH,
              CERTIFICATE_PDF_HEIGHT,
            );
          }
        } finally {
          styleSheets.forEach((s, i) => (s.media = originalMedias[i]));
        }

        pdf.save(filename);
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Certificate PDF generation failed:", error);
        alert(
          `Failed to generate certificate PDF: ${error.message || "Unknown error"}.`,
        );
      } finally {
        setIsDownloading(false);
      }
    },
    [],
  );

  return { isDownloading, downloadCertificatePdf };
};
