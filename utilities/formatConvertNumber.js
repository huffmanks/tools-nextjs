import convert from 'convert'

export const formatConvertNumber = (value, fromNum, toNum) => {
    const maxDecimals = 3

    if (toNum === 'pixels') {
        const inch = convert(parseFloat(value), fromNum).to('inch')
        return parseFloat((inch * 96).toFixed(maxDecimals))
    }

    if (fromNum === 'pixels') {
        const otherMeasurements = convert(parseFloat(value), 'inch').to(toNum)
        return parseFloat((otherMeasurements / 96).toFixed(maxDecimals))
    }

    return parseFloat(convert(parseFloat(value), fromNum).to(toNum).toFixed(maxDecimals))
}
