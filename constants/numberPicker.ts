export interface NumberPickerValues {
  total: number | "";
  unique: boolean;
  sorted: boolean;
  start: number | "";
  end: number | "";
  randomNumber: (number | string)[];
  isPowerball: boolean;
  isMegaMillions: boolean;
  isLottery: boolean;
  lotteryPower: number | string;
  resultIsCentered: boolean;
}

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
