export interface EmailSignatureValues {
  fullName: string;
  email: string;
  phone: string;
  cellPhone: string;
  fax: string;
  title: string;
  website: string;
  companyName: string;
  department: string;
  address: string;
  cityState: string;
  zipCode: string;
  themeColor: string;
}

export interface EmailInputConfig {
  name: keyof EmailSignatureValues;
  label: string;
  placeholder: string;
  required: boolean;
  gridSm: number;
}

export type EmailErrors = Partial<Record<keyof EmailSignatureValues, string>>;
