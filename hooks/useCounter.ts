interface CounterValues {
  total: number | string;
}

export const useCounter = <T extends CounterValues>(_values: T, setValues: React.Dispatch<React.SetStateAction<T>>) => {
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
