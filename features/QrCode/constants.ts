import { GLOBAL_SITE_LS_KEY_PREFIX } from "@/constants/global";

import type { QrCodeColors, QrCodeValues } from "@/features/QrCode/types";

export const QR_CODE_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_qr-code`;

const initialQrCodeValues: Omit<QrCodeValues, "colors"> = {
  qrCodeName: "",
  websiteLink: "",
  outputSize: 600,
  correctLevel: 0,
  logoBackgroundTransparent: false,
  logoUpload: "",
  logoName: "",
};

export const initialQrCodeColors: QrCodeColors = {
  dotColor: "#5b21b6",
  backgroundColor: "#fff",
  ringOuter: "#222",
  ringInner: "#222",
};

export const combinedInitialQrCodeValues: QrCodeValues = {
  ...initialQrCodeValues,
  colors: initialQrCodeColors,
};

export const qrCodeInputs = [
  {
    label: "QR Code Name",
    name: "qrCodeName" as const,
    placeholder: "qr-code",
  },
  {
    label: "Website Link",
    name: "websiteLink" as const,
    placeholder: "https://tools.huffmanks.com/generate/qr-code",
  },
];

export const qrCodeSelects = [
  {
    label: "Correction Level",
    name: "correctLevel" as const,
    options: [
      {
        label: "Level L (Low)",
        value: "1",
      },
      {
        label: "Level M (Medium)",
        value: "0",
      },
      {
        label: "Level Q (Quartile)",
        value: "3",
      },
      {
        label: "Level H (High)",
        value: "2",
      },
    ],
  },
  {
    label: "Output size",
    name: "outputSize" as const,
    options: [
      {
        label: "Small",
        value: "200",
      },
      {
        label: "Medium",
        value: "600",
      },
      {
        label: "Large",
        value: "1200",
      },
    ],
  },
];
