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
