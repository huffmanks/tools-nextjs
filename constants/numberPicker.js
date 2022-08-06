export const initialValues = {
    total: 1,
    unique: true,
    sorted: true,
    start: 1,
    end: 100,
    randomNumber: [],
    isPowerball: false,
    isMegaMillions: false,
    isLottery: false,
    lotteryPower: '',
    resultIsCentered: false,
}

export const powerballValues = {
    ...initialValues,
    total: 5,
    end: 69,
}

export const megaMillionsValues = {
    ...initialValues,
    total: 5,
    end: 70,
}
