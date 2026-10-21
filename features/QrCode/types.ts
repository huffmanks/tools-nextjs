export interface QrCodeColors {
  dotColor: string;
  backgroundColor: string;
  ringOuter: string;
  ringInner: string;
}

export interface QrCodeValues {
  colors: QrCodeColors;
  qrCodeName: string;
  websiteLink: string;
  outputSize: number;
  correctLevel: number;
  logoBackgroundTransparent: boolean;
  logoUpload: string;
  logoName: string;
}

export type QrCodeErrors = Partial<Record<keyof QrCodeValues | string, string>>;
