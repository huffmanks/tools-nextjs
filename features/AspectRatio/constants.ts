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

export const initialAspectRatioValues: AspectRatioValues = {
  originalWidth: "",
  originalHeight: "",
  selectedType: "width",
  newSize: "",
  newWidth: "",
  newHeight: "",
  suggestedLowerWidth: "",
  suggestedLowerHeight: "",
  suggestedHigherWidth: "",
  suggestedHigherHeight: "",
  aspectRatio: "",
  aspectMultiplier: "",
  dimensions: "",
};

export const aspectInputs: AspectInputConfig[] = [
  {
    name: "originalWidth",
    label: "Width",
    placeholder: "1920",
  },
  {
    name: "originalHeight",
    label: "Height",
    placeholder: "1080",
  },
  {
    name: "newSize",
    label: "Width",
    placeholder: "500",
    isDynamic: true,
  },
];

export const aspectOutput: AspectOutputConfig[] = [
  {
    name: "newWidth",
    label: "New Width",
    placeholder: "800",
  },
  {
    name: "newHeight",
    label: "New Height",
    placeholder: "450",
  },
  {
    name: "aspectRatio",
    label: "Aspect Ratio",
    placeholder: "16:9",
  },
  {
    name: "aspectMultiplier",
    label: "Aspect Multiplier",
    placeholder: "1.78",
  },
  {
    name: "suggestedLowerWidth",
    label: "Lower Width",
    placeholder: "400",
  },
  {
    name: "suggestedLowerHeight",
    label: "Lower Height",
    placeholder: "225",
  },
  {
    name: "suggestedHigherWidth",
    label: "Higher Width",
    placeholder: "1200",
  },
  {
    name: "suggestedHigherHeight",
    label: "Higher Height",
    placeholder: "675",
  },
];
