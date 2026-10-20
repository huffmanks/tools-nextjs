import type { ChangeEvent, FocusEvent } from "react";
import { useState } from "react";

import { initialValues } from "../../constants/aspectRatio";
import { getAspectNumbers } from "./getAspectNumbers";

type AspectRatioValues = typeof initialValues;
type AspectRatioField = keyof AspectRatioValues;
type AspectRatioErrors = Partial<Record<AspectRatioField, string>>;

type CalculatedLowerBounds = {
  width: string;
  height: string;
};

type AspectRatioChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export const useAspectRatioFormControls = () => {
  const [values, setValues] = useState<AspectRatioValues>(initialValues);
  const [errors, setErrors] = useState<AspectRatioErrors>({});

  const validate = (
    fieldValues: Partial<AspectRatioValues> = values,
    calculatedLowerBounds: CalculatedLowerBounds | null = null,
  ): boolean => {
    const temp: AspectRatioErrors = { ...errors };

    if (fieldValues.originalWidth !== undefined) {
      temp.originalWidth =
        fieldValues.originalWidth.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.originalWidth === ""
          ? ""
          : "Must be a number.";
    }

    if (fieldValues.originalHeight !== undefined) {
      temp.originalHeight =
        fieldValues.originalHeight.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.originalHeight === ""
          ? ""
          : "Must be a number.";
    }

    if (fieldValues.newSize !== undefined) {
      temp.newSize =
        fieldValues.newSize.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.newSize === ""
          ? ""
          : "Must be a number.";
    }

    if (calculatedLowerBounds !== null) {
      const { width, height } = calculatedLowerBounds;
      const currentNewSize = fieldValues.newSize !== undefined ? fieldValues.newSize : values.newSize;

      if (currentNewSize !== "" && (!width || !height)) {
        temp.suggestedLowerWidth = "Result below zero.";
        temp.suggestedLowerHeight = "Result below zero.";
      } else {
        temp.suggestedLowerWidth = "";
        temp.suggestedLowerHeight = "";
      }
    }

    setErrors(temp);

    return !temp.originalWidth && !temp.originalHeight && !temp.newSize;
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    event.target.select();
  };

  const handleChange = (event: AspectRatioChangeEvent): void => {
    const { name, value } = event.target;
    const field = name as AspectRatioField;

    if (name === "selectedType" && values.newSize) {
      const calculated = getAspectNumbers({ ...values, selectedType: value });

      setValues({
        ...values,
        selectedType: value,
        ...calculated,
      });
    } else if (name === "originalWidth" || name === "originalHeight" || name === "newSize") {
      setErrors((prev) => ({
        ...prev,
        suggestedLowerWidth: "",
        suggestedLowerHeight: "",
      }));

      const isValid = validate({ [field]: value });

      if (!isNaN(Number(value)) && isValid) {
        const hasValue = value !== "";

        const currentUpdatedValues = {
          ...values,
          [field]: value,
        };

        const hasNewSize = !!currentUpdatedValues.newSize && !isNaN(Number(currentUpdatedValues.newSize));
        const hasOriginalDims = !!currentUpdatedValues.originalWidth && !!currentUpdatedValues.originalHeight;
        const isCalculable = hasValue && hasNewSize && hasOriginalDims;

        if (isCalculable) {
          const calculated = getAspectNumbers(currentUpdatedValues);

          validate(currentUpdatedValues, {
            width: calculated.suggestedLowerWidth,
            height: calculated.suggestedLowerHeight,
          });

          setValues({
            ...currentUpdatedValues,
            ...calculated,
          });
        } else {
          if (!hasValue) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
          }

          setValues({
            ...currentUpdatedValues,
            newWidth: "",
            newHeight: "",
            suggestedLowerWidth: "",
            suggestedLowerHeight: "",
            suggestedHigherWidth: "",
            suggestedHigherHeight: "",
            aspectRatio: "",
            aspectMultiplier: "",
            dimensions: "",
          });
        }
      } else {
        setValues((prev) => ({
          ...values,
          [field]: prev[field],
        }));
      }
    } else {
      setValues({
        ...values,
        [field]: value,
      });
    }
  };

  const handleBlur = (): void => {
    setErrors({});
  };

  return {
    values,
    errors,
    handleFocus,
    handleChange,
    handleBlur,
  };
};
