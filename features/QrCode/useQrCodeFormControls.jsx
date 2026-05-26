import { useEffect, useRef, useState } from "react";

import QRCode from "easyqrcodejs";

import { initialColors, initialValues, QR_CODE_LS_KEY } from "../../constants/qrCode";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const combinedInitialValues = {
  ...initialValues,
  colors: initialColors,
};

export const useQrCodeFormControls = () => {
  const codeRef = useRef();

  const [values, setValues] = useLocalStorage(QR_CODE_LS_KEY, combinedInitialValues);
  const [errors, setErrors] = useState({});
  const [qrcode, setQrcode] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const colors = values.colors || initialColors;

  useEffect(() => {
    if (hasSubmitted) {
      const isValid = validate(values);
      if (isValid) {
        generateQRCode(values);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, hasSubmitted]);

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    return urlPattern.test(url);
  };

  const validate = () => {
    let tempErrors = {};

    if (!values.qrCodeName || values.qrCodeName.trim() === "") {
      tempErrors.qrCodeName = "QR Code name is required.";
    }

    if (!values.websiteLink || values.websiteLink.trim() === "") {
      tempErrors.websiteLink = "URL link is required.";
    } else if (!isValidUrl(values.websiteLink)) {
      tempErrors.websiteLink = "Please enter a valid URL.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const generateQRCode = (currentValues) => {
    if (qrcode) {
      qrcode.clear();
    }

    const { websiteLink, outputSize, correctLevel, logoUpload, logoBackgroundTransparent } = currentValues;
    const activeColors = currentValues.colors || initialColorValues;

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

    const QRCodeCanvas = new QRCode(codeRef.current, options);
    setQrcode(QRCodeCanvas);

    setTimeout(() => {
      const dataURL = QRCodeCanvas?._el.children[0].toDataURL("image/png");
      const url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");

      setDownloadUrl(url);
    }, 100);
  };

  const handleChange = (e) => {
    const { checked, name, type, value, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = (event) => {
        const updatedWithFile = {
          ...values,
          logoUpload: event.target.result,
          logoName: file.name,
        };
        setValues(updatedWithFile);

        if (hasSubmitted && validate(updatedWithFile)) {
          generateQRCode(updatedWithFile);
        }
      };

      reader.readAsDataURL(file);
      return;
    }

    let nextValues = { ...values };

    if (type === "checkbox") {
      nextValues[name] = checked;
    } else {
      nextValues[name] = value;
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setValues(nextValues);

    if (hasSubmitted) {
      const isValid = validate(nextValues);
      if (isValid) {
        generateQRCode(nextValues);
      } else {
        setDownloadUrl("");
      }
    }
  };

  const handleColorChange = (name, colorValue) => {
    const updatedValues = {
      ...values,
      colors: {
        ...(values.colors || initialColorValues),
        [name]: colorValue,
      },
    };

    setValues(updatedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setDownloadUrl("");
      return;
    }

    setHasSubmitted(true);
    generateQRCode(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setDownloadUrl("");
    setErrors({});
    setHasSubmitted(false);

    if (qrcode) {
      qrcode.clear();
    }
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
