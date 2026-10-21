import type { InitialCssScrollbarValues } from "@/features/CSSScrollbar/types";

export const initialCssScrollbarValues: InitialCssScrollbarValues = {
  axis: "y",
  widthFirefox: "auto",
  thickness: 18,
  isTrackTransparent: true,
  trackRadius: 8,
  trackBorderWidth: 1,
  thumbRadius: 50,
  thumbBorderWidth: 1,
};

export const directionRadios = [
  {
    value: "y",
    label: "Vertical",
  },
  {
    value: "x",
    label: "Horizontal",
  },
];

export const trackTransparentRadios = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];

export const firefoxWidthSelect = [
  {
    value: "auto",
    label: "Auto",
  },
  {
    value: "thin",
    label: "Thin",
  },
  {
    value: "none",
    label: "None",
  },
];
