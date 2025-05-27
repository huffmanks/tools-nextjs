export const getAspectNumbers = (values) => {
  const newOtherSize =
    values.newSize === ""
      ? ""
      : values.selectedType === "width"
      ? Math.round((values.originalHeight / values.originalWidth) * values.newSize * 100) / 100
      : Math.round((values.originalWidth / values.originalHeight) * values.newSize * 100) / 100;

  const newWidth = values.selectedType === "width" ? values.newSize : newOtherSize;
  const newHeight = values.selectedType === "height" ? values.newSize : newOtherSize;

  const hasDimensions = !!newWidth && !!newHeight && !!values.originalWidth && !!values.originalHeight ? true : false;

  const dimensions = hasDimensions ? `${newWidth} x ${newHeight}` : "";

  const aspectGCD = getAspectGCD(parseInt(values.originalWidth), parseInt(values.originalHeight));

  const aspectMultiplier = (values.originalWidth / values.originalHeight).toFixed(2);

  const aspectRatio = `${values.originalWidth / aspectGCD}:${values.originalHeight / aspectGCD}`;

  const { lower, higher } = suggestNearestIntegerDimensions(Number(values.originalWidth), Number(values.originalHeight), Number(values.newSize), values.selectedType);

  const suggestedValues = {
    suggestedLowerWidth: String(lower?.width) ?? "",
    suggestedLowerHeight: String(lower?.height) ?? "",
    suggestedHigherWidth: String(higher?.width) ?? "",
    suggestedHigherHeight: String(higher?.height) ?? "",
  };

  return { newWidth, newHeight, ...suggestedValues, aspectMultiplier, aspectRatio, dimensions };
};

function getAspectGCD(...arr) {
  const gcd = (x, y) => (!y ? x : getAspectGCD(y, x % y));
  return [...arr].reduce((a, b) => gcd(a, b));
}

function suggestNearestIntegerDimensions(originalWidth, originalHeight, target, selectedType) {
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

function findNearestFromWidth(baseWidth, aspectRatio, direction) {
  let width = baseWidth + (direction === "up" ? 1 : -1);
  const step = direction === "up" ? 1 : -1;

  while (width > 0) {
    const height = width * aspectRatio;
    if (Number.isInteger(height)) {
      return { width, height: Math.round(height) };
    }
    width += step;
  }
}

function findNearestFromHeight(baseHeight, aspectRatio, direction) {
  let height = baseHeight + (direction === "up" ? 1 : -1);
  const step = direction === "up" ? 1 : -1;

  while (height > 0) {
    const width = height / aspectRatio;
    if (Number.isInteger(width)) {
      return { width: Math.round(width), height };
    }
    height += step;
  }
}
