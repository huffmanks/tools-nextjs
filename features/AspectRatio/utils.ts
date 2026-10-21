import { type AspectRatioValues } from "./constants";

interface DimensionResult {
  width: number | string;
  height: number | string;
}

interface SuggestedDimensionsResult {
  lower: DimensionResult;
  higher: DimensionResult;
}

export const getAspectNumbers = (values: AspectRatioValues) => {
  const newOtherSize =
    values.newSize === ""
      ? ""
      : values.selectedType === "width"
        ? Math.round(
            (Number(values.originalHeight) / Number(values.originalWidth)) *
              Number(values.newSize) *
              100
          ) / 100
        : Math.round(
            (Number(values.originalWidth) / Number(values.originalHeight)) *
              Number(values.newSize) *
              100
          ) / 100;

  const newWidth = values.selectedType === "width" ? values.newSize : String(newOtherSize);
  const newHeight = values.selectedType === "height" ? values.newSize : String(newOtherSize);

  const hasDimensions =
    !!newWidth && !!newHeight && !!values.originalWidth && !!values.originalHeight ? true : false;

  const dimensions = hasDimensions ? `${newWidth} x ${newHeight}` : "";

  const aspectGCD = getAspectGCD(parseInt(values.originalWidth), parseInt(values.originalHeight));
  const aspectMultiplier = (Number(values.originalWidth) / Number(values.originalHeight)).toFixed(
    2
  );
  const aspectRatio = `${Number(values.originalWidth) / aspectGCD}:${Number(values.originalHeight) / aspectGCD}`;

  const { lower, higher } = suggestNearestIntegerDimensions(
    Number(values.originalWidth),
    Number(values.originalHeight),
    Number(values.newSize),
    values.selectedType
  );

  const suggestedValues = {
    suggestedLowerWidth:
      lower?.width !== undefined && lower?.width !== "" ? String(lower.width) : "",
    suggestedLowerHeight:
      lower?.height !== undefined && lower?.height !== "" ? String(lower.height) : "",
    suggestedHigherWidth:
      higher?.width !== undefined && higher?.width !== "" ? String(higher.width) : "",
    suggestedHigherHeight:
      higher?.height !== undefined && higher?.height !== "" ? String(higher.height) : "",
  };

  return { newWidth, newHeight, ...suggestedValues, aspectMultiplier, aspectRatio, dimensions };
};

function getAspectGCD(...arr: number[]): number {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => gcd(a, b));
}

function suggestNearestIntegerDimensions(
  originalWidth: number,
  originalHeight: number,
  target: number,
  selectedType: string
): SuggestedDimensionsResult {
  const aspectRatio = originalHeight / originalWidth;

  if (selectedType === "width") {
    const lower = findNearestFromWidth(target, aspectRatio, "down");
    const higher = findNearestFromWidth(target, aspectRatio, "up");
    return { lower, higher };
  }

  if (selectedType === "height") {
    const lower = findNearestFromHeight(target, aspectRatio, "down");
    const higher = findNearestFromHeight(target, aspectRatio, "up");
    return { lower, higher };
  }

  return {
    lower: { width: "", height: "" },
    higher: { width: "", height: "" },
  };
}

function findNearestFromWidth(
  baseWidth: number,
  aspectRatio: number,
  direction: "up" | "down"
): DimensionResult {
  let width = baseWidth + (direction === "up" ? 1 : -1);
  const step = direction === "up" ? 1 : -1;

  while (width > 0) {
    const height = width * aspectRatio;
    if (Math.abs(height - Math.round(height)) < 0.000001) {
      return { width, height: Math.round(height) };
    }
    width += step;
  }

  return { width: "", height: "" };
}

function findNearestFromHeight(
  baseHeight: number,
  aspectRatio: number,
  direction: "up" | "down"
): DimensionResult {
  let height = baseHeight + (direction === "up" ? 1 : -1);
  const step = direction === "up" ? 1 : -1;

  while (height > 0) {
    const width = height / aspectRatio;
    if (Math.abs(width - Math.round(width)) < 0.000001) {
      return { width: Math.round(width), height };
    }
    height += step;
  }

  return { width: "", height: "" };
}
