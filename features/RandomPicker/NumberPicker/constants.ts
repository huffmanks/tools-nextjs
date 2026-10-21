import type { NumberPickerValues } from "@/features/RandomPicker/NumberPicker/types";

export const initialNumberPickerValues: NumberPickerValues = {
  total: 1,
  unique: true,
  sorted: true,
  start: 1,
  end: 100,
  randomNumber: [],
  isPowerball: false,
  isMegaMillions: false,
  isLottery: false,
  lotteryPower: "",
  resultIsCentered: false,
};

export const powerballValues: NumberPickerValues = {
  ...initialNumberPickerValues,
  total: 5,
  end: 69,
};

export const megaMillionsValues: NumberPickerValues = {
  ...initialNumberPickerValues,
  total: 5,
  end: 70,
};
