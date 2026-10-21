import { useState } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import {
  EMAIL_SIGNATURE_LS_KEY,
  type EmailSignatureValues,
  initialEmailSignatureValues,
} from "./constants";

export type EmailErrors = Partial<Record<keyof EmailSignatureValues, string>>;

export const useEmailSignatureFormControls = () => {
  const [values, setValues] = useLocalStorage<EmailSignatureValues>(
    EMAIL_SIGNATURE_LS_KEY,
    initialEmailSignatureValues
  );
  const [errors, setErrors] = useState<EmailErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = (fieldValues: Partial<EmailSignatureValues> = values) => {
    const temp: EmailErrors = { ...errors };

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("title" in fieldValues) temp.title = fieldValues.title ? "" : "This field is required.";

    if ("phone" in fieldValues) {
      temp.phone = fieldValues.phone ? "" : "This field is required.";
      if (fieldValues.phone)
        temp.phone = fieldValues.phone.match(/^(\(\d{3}\)\s?|\d{3}[-.]?)?\d{3}[-.]?\d{4}$/g)
          ? ""
          : "Phone number is not valid.";
    }

    if ("cellPhone" in fieldValues) {
      temp.cellPhone =
        fieldValues.cellPhone.match(/^(\(\d{3}\)\s?|\d{3}[-.]?)?\d{3}[-.]?\d{4}$/g) ||
        fieldValues.cellPhone === ""
          ? ""
          : "Cell number is not valid.";
    }

    if ("fax" in fieldValues) {
      temp.fax =
        fieldValues.fax.match(/^(\(\d{3}\)\s?|\d{3}[-.]?)?\d{3}[-.]?\d{4}$/g) ||
        fieldValues.fax === ""
          ? ""
          : "Fax number is not valid.";
    }

    if ("website" in fieldValues) {
      temp.website =
        fieldValues.website.match(
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
        ) || fieldValues.website === ""
          ? ""
          : "Website URL is not valid.";
    }

    setErrors({
      ...temp,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormSubmitted(false);

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleColorChange = (_name?: string, colorValue?: string) => {
    setValues((prev) => ({
      ...prev,
      themeColor: colorValue || initialEmailSignatureValues.themeColor,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validate({ [name]: value } as Partial<EmailSignatureValues>);
  };

  const formIsValid = (fieldValues: Partial<EmailSignatureValues> = values) => {
    const isValid =
      Boolean(fieldValues?.fullName) &&
      Boolean(fieldValues?.email) &&
      Boolean(fieldValues?.title) &&
      Boolean(fieldValues?.phone) &&
      Object.values(errors).every((x) => x === "");
    return Boolean(isValid);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formIsValid()) {
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  };

  const handleReset = () => {
    setValues(initialEmailSignatureValues);
    setErrors({});
    setFormSubmitted(false);
  };

  return {
    values,
    errors,
    formSubmitted,
    formIsValid,
    handleChange,
    handleColorChange,
    handleBlur,
    handleSubmit,
    handleReset,
  };
};
