import { useCallback, useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";

import QRCode from "easyqrcodejs";

import { initialColors, initialValues, QR_CODE_LS_KEY } from "../../constants/qrCode";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const combinedInitialValues = {
  ...initialValues,
  colors: initialColors,
};

type FormValues = typeof combinedInitialValues;
type FormErrors = Partial<Record<keyof FormValues | string, string>>;
type QRCodeInstance = InstanceType<typeof QRCode> & {
  _el: HTMLElement;
};

function getErrors(values: FormValues): FormErrors {
  const errors: FormErrors = {};
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

  const [values, setValues] = useLocalStorage(QR_CODE_LS_KEY, combinedInitialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [downloadUrl, setDownloadUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const colors = values.colors || initialColors;

  const validate = useCallback(
    (currentValues: FormValues = values) => {
      const nextErrors = getErrors(currentValues);
      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    },
    [values],
  );

  const generateQRCode = useCallback((currentValues: FormValues) => {
    qrcodeRef.current?.clear();

    const { websiteLink, outputSize, correctLevel, logoUpload, logoBackgroundTransparent } = currentValues;

    const activeColors = currentValues.colors || initialColors;
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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const { name, type, value } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : false;

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

  const handleColorChange = (name: keyof typeof initialColors, colorValue: string) => {
    const nextValues = {
      ...values,
      colors: {
        ...(values.colors || initialColors),
        [name]: colorValue,
      },
    };

    setValues(nextValues);

    if (hasSubmitted && validate(nextValues)) {
      generateQRCode(nextValues);
    }
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      setDownloadUrl("");
      return;
    }

    setHasSubmitted(true);
    generateQRCode(values);
  };

  const handleReset = () => {
    setValues(combinedInitialValues);
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
