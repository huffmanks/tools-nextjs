export type InitialCssScrollbarValues = {
  axis: string;
  widthFirefox: string;
  thickness: number;
  isTrackTransparent: boolean;
  trackRadius: number;
  trackBorderWidth: number;
  trackBorderStyle: string;
  thumbRadius: number;
  thumbBorderWidth: number;
  thumbBorderStyle: string;
};

export const initialValues: InitialCssScrollbarValues = {
  axis: "y",
  widthFirefox: "auto",
  thickness: 18,
  isTrackTransparent: true,
  trackRadius: 8,
  trackBorderWidth: 1,
  trackBorderStyle: "solid",
  thumbRadius: 50,
  thumbBorderWidth: 1,
  thumbBorderStyle: "solid",
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

export const borderStyleSelect = [
  {
    value: "solid",
    label: "Solid",
  },
  {
    value: "dashed",
    label: "Dashed",
  },
  {
    value: "dotted",
    label: "Dotted",
  },
  {
    value: "double",
    label: "Double",
  },
  {
    value: "groove",
    label: "Groove",
  },
  {
    value: "outset",
    label: "Outset",
  },
  {
    value: "ridge",
    label: "Ridge",
  },
];
