import { GLOBAL_SITE_LS_KEY_PREFIX } from "./global";

export const QR_CODE_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_qr-code`;

export const initialValues = {
  qrCodeName: "",
  websiteLink: "",
  outputSize: 600,
  correctLevel: 0,
  logoBackgroundTransparent: false,
  logoUpload: "",
  logoName: "",
};

export const initialColors = {
  dotColor: "#5b21b6",
  backgroundColor: "#fff",
  ringOuter: "#222",
  ringInner: "#222",
};

export const qrCodeInputs = [
  {
    label: "QR Code Name",
    name: "qrCodeName",
    placeholder: "qr-code",
  },
  {
    label: "Website Link",
    name: "websiteLink",
    placeholder: "https://tools.huffmanks.com/generate/qr-code",
  },
];

export const qrCodeSelects = [
  {
    label: "Correction Level",
    name: "correctLevel",
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
    name: "outputSize",
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
