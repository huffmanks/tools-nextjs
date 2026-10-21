export interface AspectRatioValues {
  originalWidth: string;
  originalHeight: string;
  selectedType: string;
  newSize: string;
  newWidth: string;
  newHeight: string;
  suggestedLowerWidth: string;
  suggestedLowerHeight: string;
  suggestedHigherWidth: string;
  suggestedHigherHeight: string;
  aspectRatio: string;
  aspectMultiplier: string;
  dimensions: string;
}

export type AspectRatioErrors = Partial<Record<keyof AspectRatioValues, string>>;

export interface AspectInputConfig {
  name: keyof AspectRatioValues;
  label: string;
  placeholder: string;
  isDynamic?: boolean;
}

export interface AspectOutputConfig {
  name: keyof AspectRatioValues;
  label: string;
  placeholder: string;
}

export type AspectRatioField = keyof AspectRatioValues;

export interface CalculatedLowerBounds {
  width: string;
  height: string;
}
