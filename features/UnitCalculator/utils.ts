import convert from "convert";

type ConvertUnit = Parameters<typeof convert>[1];

export const formatConvertNumber = (value: string | number, fromNum: string, toNum: string): number => {
  const maxDecimals = 3;
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (toNum === "pixels") {
    const inch = convert(numValue, fromNum as ConvertUnit).to("inch" as ConvertUnit);
    return parseFloat((inch * 96).toFixed(maxDecimals));
  }
  if (fromNum === "pixels") {
    const otherMeasurements = convert(numValue, "inch" as ConvertUnit).to(toNum as ConvertUnit);
    return parseFloat((otherMeasurements / 96).toFixed(maxDecimals));
  }

  return parseFloat(
    convert(numValue, fromNum as ConvertUnit)
      .to(toNum as ConvertUnit)
      .toFixed(maxDecimals),
  );
};
