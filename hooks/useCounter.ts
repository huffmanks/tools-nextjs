import { Dispatch, SetStateAction } from "react";

interface CounterValues {
  total: number | string;
  [key: string]: any;
}

export const useCounter = <T extends CounterValues>(_values: T, setValues: Dispatch<SetStateAction<T>>) => {
  const handleDecrease = () => {
    setValues((prev) => ({
      ...prev,
      total:
        typeof prev.total === "string"
          ? parseInt(prev.total, 10) === 1
            ? 1
            : parseInt(prev.total, 10) - 1
          : prev.total === 1
            ? 1
            : prev.total - 1,
    }));
  };

  const handleIncrease = () => {
    setValues((prev) => ({
      ...prev,
      total: typeof prev.total === "string" ? parseInt(prev.total, 10) + 1 : prev.total + 1,
    }));
  };

  return {
    handleDecrease,
    handleIncrease,
  };
};
