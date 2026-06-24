import { useState } from "react";

import { initialValues } from "../../constants/aspectRatio";
import { getAspectNumbers } from "./getAspectNumbers";

export const useAspectRatioFormControls = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values, calculatedLowerBounds = null) => {
    let temp = { ...errors };

    if ("originalWidth" in fieldValues) {
      temp.originalWidth =
        fieldValues.originalWidth.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.originalWidth === ""
          ? ""
          : "Must be a number.";
    }

    if ("originalHeight" in fieldValues) {
      temp.originalHeight =
        fieldValues.originalHeight.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.originalHeight === ""
          ? ""
          : "Must be a number.";
    }

    if ("newSize" in fieldValues) {
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

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedType" && values.newSize) {
      const calculated = getAspectNumbers({ ...values, [name]: value });

      setValues({
        ...values,
        [name]: value,
        ...calculated,
      });
    } else if (name === "originalWidth" || name === "originalHeight" || name === "newSize") {
      setErrors((prev) => ({
        ...prev,
        suggestedLowerWidth: "",
        suggestedLowerHeight: "",
      }));

      const isValid = validate({ [name]: value });

      if (!isNaN(value) && isValid) {
        const hasValue = value !== "";
        const isOriginal = name === "originalWidth" || name === "originalHeight";

        const currentUpdatedValues = {
          ...values,
          [name]: value,
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
            setErrors((prev) => ({ ...prev, [name]: "" }));
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
          [name]: prev[name],
        }));
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleBlur = () => {
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
