export interface UnitCalculatorValues {
  measurement: string;
  numInput: string;
  unitSelection: string;
}

export interface UnitItem {
  id: string;
  unit: string;
  label: string;
  short: string;
}

export type UnitItems = readonly UnitItem[];

export interface UnitCalculatorMeasurement {
  id: number;
  type: string;
  label: string;
  units: UnitItems;
}

export interface UnitCalculatorFormState {
  queryKey: string | null;
  values: UnitCalculatorValues;
  currentUnits: UnitItems;
}
