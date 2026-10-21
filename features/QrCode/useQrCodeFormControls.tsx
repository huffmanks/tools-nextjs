import { useCallback, useRef, useState } from "react";

import { type SelectChangeEvent } from "@mui/material";
import QRCode from "easyqrcodejs";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import {
  QR_CODE_LS_KEY,
  type QrCodeColors,
  type QrCodeErrors,
  type QrCodeValues,
  combinedInitialQrCodeValues,
  initialQrCodeColors,
} from "@/features/QrCode/constants";

type QRCodeInstance = InstanceType<typeof QRCode> & {
  _el: HTMLElement;
};

function getErrors(values: QrCodeValues): QrCodeErrors {
  const errors: QrCodeErrors = {};
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;

  if (!values.qrCodeName || values.qrCodeName.trim() === "") {
    errors.qrCodeName = "QR Code name is required.";
  }

  if (!values.websiteLink || values.websiteLink.trim() === "") {
    errors.websiteLink = "URL link is required.";
  } else if (!urlPattern.test(values.websiteLink)) {
    errors.websiteLink = "Please enter a valid URL.";
  }

  return errors;
}

export const useQrCodeFormControls = () => {
  const codeRef = useRef<HTMLDivElement>(null);
  const qrcodeRef = useRef<QRCodeInstance | null>(null);

  const [values, setValues] = useLocalStorage<QrCodeValues>(
    QR_CODE_LS_KEY,
    combinedInitialQrCodeValues
  );
  const [errors, setErrors] = useState<QrCodeErrors>({});
  const [downloadUrl, setDownloadUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const colors = values.colors || initialQrCodeColors;

  const validate = useCallback(
    (currentValues: QrCodeValues = values) => {
      const nextErrors = getErrors(currentValues);
      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    },
    [values]
  );

  const generateQRCode = useCallback((currentValues: QrCodeValues) => {
    qrcodeRef.current?.clear();

    const { websiteLink, outputSize, correctLevel, logoUpload, logoBackgroundTransparent } =
      currentValues;

    const activeColors = currentValues.colors || initialQrCodeColors;
    if (!codeRef.current) return;

    const options = {
      text: websiteLink,
      width: Number(outputSize),
      height: Number(outputSize),
      logo: logoUpload,
      logoBackgroundTransparent,
      colorDark: activeColors.dotColor,
      colorLight: activeColors.backgroundColor,
      PO: activeColors.ringOuter,
      PI: activeColors.ringInner,
      correctLevel: Number(correctLevel),
    };

    const instance = new QRCode(codeRef.current, options) as QRCodeInstance;
    qrcodeRef.current = instance;

    setTimeout(() => {
      const canvas = instance._el.children[0] as HTMLCanvasElement | undefined;
      if (!canvas) return;

      const dataURL = canvas.toDataURL("image/png");
      setDownloadUrl(dataURL.replace(/^data:image\/png/, "data:application/octet-stream"));
    }, 100);
  }, []);

  const handleChange = (
    event:
      React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const target = event.target;
    const name = target.name as keyof QrCodeValues;
    if (!name) return;

    const value = target.value;
    const type = "type" in target ? target.type : undefined;
    const checked = "checked" in target ? Boolean((target as HTMLInputElement).checked) : false;

    if (type === "file") {
      const file = target instanceof HTMLInputElement ? target.files?.[0] : undefined;
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result !== "string") return;

        const updatedValues = {
          ...values,
          logoUpload: result,
          logoName: file.name,
        };

        setValues(updatedValues);

        if (hasSubmitted && validate(updatedValues)) {
          generateQRCode(updatedValues);
        }
      };

      reader.readAsDataURL(file);
      return;
    }

    const nextValues = {
      ...values,
      [name]: type === "checkbox" ? checked : value,
    };

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }

    setValues(nextValues);

    if (hasSubmitted) {
      if (validate(nextValues)) {
        generateQRCode(nextValues);
      } else {
        setDownloadUrl("");
      }
    }
  };

  const handleColorChange = (name: keyof QrCodeColors, colorValue: string) => {
    const nextValues = {
      ...values,
      colors: {
        ...(values.colors || initialQrCodeColors),
        [name]: colorValue,
      },
    };

    setValues(nextValues);

    if (hasSubmitted && validate(nextValues)) {
      generateQRCode(nextValues);
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      setDownloadUrl("");
      return;
    }

    setHasSubmitted(true);
    generateQRCode(values);
  };

  const handleReset = () => {
    setValues(combinedInitialQrCodeValues);
    setDownloadUrl("");
    setErrors({});
    setHasSubmitted(false);

    qrcodeRef.current?.clear();
    qrcodeRef.current = null;
  };

  return {
    codeRef,
    values,
    colors,
    errors,
    downloadUrl,
    handleChange,
    handleColorChange,
    handleSubmit,
    handleReset,
  };
};
