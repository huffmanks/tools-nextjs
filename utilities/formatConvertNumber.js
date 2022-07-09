import convert from 'convert'

export const formatConvertNumber = (value, fromNum, toNum) => {
    const decimals = 3

    return Number(Math.round(parseFloat(convert(parseInt(value), fromNum).to(toNum) + 'e' + decimals)) + 'e-' + decimals)
}
