import { useRef, useState } from "react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useGlobalState } from "@/hooks/useGlobalState";
import { generateRandomNumbers } from "@/utils/generateRandomNumbers";

import {
  type NumberPickerValues,
  initialNumberPickerValues,
  megaMillionsValues,
  powerballValues,
} from "./constants";

export const useNumberPickerFormControls = () => {
  const resultRef = useRef<HTMLDivElement>(null);

  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(true);

  const [values, setValues] = useState<NumberPickerValues>(initialNumberPickerValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { value, name, type, checked } = target;

    if (name === "total" || name === "start" || name === "end") {
      setValues((prev) => ({
        ...values,
        isLottery: false,
        [name]: prev[name] === "" && parseInt(value) === 0 ? "" : value.replace(/[^0-9]/g, ""),
      }));
    } else if (name === "powerball") {
      setValues((prev) => ({
        ...powerballValues,
        isLottery: checked,
        isPowerball: !prev.isPowerball,
      }));
    } else if (name === "megaMillions") {
      setValues((prev) => ({
        ...megaMillionsValues,
        isLottery: checked,
        isMegaMillions: !prev.isMegaMillions,
      }));
    } else {
      setValues({
        ...values,
        isLottery: false,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleClick = () => {
    const { total, unique, sorted, start, end, isPowerball, isMegaMillions } = values;

    const numTotal = typeof total === "number" ? total : parseInt(total || "0", 10);
    const numStart = typeof start === "number" ? start : parseInt(start || "0", 10);
    const numEnd = typeof end === "number" ? end : parseInt(end || "0", 10);

    const lowerNumber = numStart < numEnd ? numStart : numEnd;
    const higherNumber = numStart > numEnd ? numStart : numEnd;

    const isLottery = (isPowerball || isMegaMillions) ?? false;

    const output = generateRandomNumbers({
      total: numTotal,
      lowerNumber,
      higherNumber,
      unique,
      sorted,
      isLottery,
    });

    let resultIsCentered = false;
    if (resultRef.current) {
      const resultChildren = [...resultRef.current.children].map(
        (child) => (child as HTMLElement).offsetWidth + 16
      );
      const resultChildrenWidth = resultChildren.reduce((prev, val) => prev + val, 0);
      const resultWidth = resultRef.current.offsetWidth;
      resultIsCentered = resultChildrenWidth > resultWidth;
    }

    const lotteryPowerOutput = isLottery
      ? generateRandomNumbers({
          total: 1,
          lowerNumber: 1,
          higherNumber: isPowerball ? 26 : 25,
        })
      : "";

    setValues((prev) => ({
      ...prev,
      randomNumber: output,
      isLottery,
      lotteryPower: Array.isArray(lotteryPowerOutput) ? lotteryPowerOutput[0] : "",
      resultIsCentered,
    }));
  };

  const handleCopy = async () => {
    if (!resultRef.current) return;

    const copySuccess = await copy(resultRef.current);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  const handleReset = () => {
    setValues(initialNumberPickerValues);
  };

  return {
    resultRef,
    values,
    setValues,
    handleChange,
    handleClick,
    handleCopy,
    handleReset,
  };
};
