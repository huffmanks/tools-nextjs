import { includedItems } from '../constants/passwordGenerator'

const getRandomSymbol = () => {
    const symbols = '!@#$%&*'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const getRandomNumber = (excludeSimilar) => {
    const items = [3, 4, 6, 7, 9]

    if (excludeSimilar) {
        return items[Math.floor(Math.random() * items.length)]
    } else {
        return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
    }
}

const getRandomLower = (excludeSimilar) => {
    if (excludeSimilar) {
        return includedItems[Math.floor(Math.random() * includedItems.length)]
    } else {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
}

const getRandomUpper = (excludeSimilar) => {
    const items = includedItems.map((letter) => letter.toUpperCase())

    if (excludeSimilar) {
        return items[Math.floor(Math.random() * items.length)]
    } else {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    }
}

const randomGenerator = {
    symbols: getRandomSymbol,
    numbers: getRandomNumber,
    lowerCase: getRandomLower,
    upperCase: getRandomUpper,
}

const shuffle = (str) => [...str].sort(() => Math.random() - 0.5).join('')

export const generatePassword = (symbols, numbers, lowerCase, upperCase, excludeSimilar, length) => {
    const typesCount = symbols + numbers + lowerCase + upperCase

    const typesArr = [{ symbols }, { numbers }, { lowerCase }, { upperCase }].filter((item) => Object.values(item)[0])

    if (typesCount === 0) {
        return ''
    }

    const iterate = Math.ceil(length / typesCount)
    let generatedPassword = ''

    Array.from({ length: iterate }, () => {
        typesArr.map((type) => {
            const name = Object.keys(type)[0]

            generatedPassword += randomGenerator[name](excludeSimilar)
        })
    })

    const finalPassword = shuffle(generatedPassword).slice(0, length)

    return finalPassword
}
