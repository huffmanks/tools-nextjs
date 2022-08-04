import { themeColorOptions } from '../../constants/emailSignature'

export const getColorOptionsInfo = (value, output) => {
    const option = themeColorOptions.filter((opt) => opt.name === value)

    if (option.length) {
        const { colorSymbol, defaultValue, hasEndSymbol } = option[0]

        if (output === 'colorSymbol') {
            return colorSymbol
        }

        if (output === 'defaultValue') {
            return defaultValue
        }

        if (output === 'hasEndSymbol') {
            return hasEndSymbol
        }
    }
}

export const getColorCode = (values) => {
    return values.colorSymbol + values.themeColor + (values.hasEndSymbol ? ')' : '')
}
