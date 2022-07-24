const getRandomNumber = (lowerNumber, higherNumber) => {
    return Math.floor(Math.random() * (higherNumber - lowerNumber + 1) + lowerNumber)
}

export const generateRandomNumbers = (total, lowerNumber, higherNumber, unique, sorted, isLottery) => {
    let output = unique ? new Set() : []

    if (isLottery) {
        total = 4
    }

    let quantity = total * 3

    if (unique) {
        Array.from({ length: quantity }, () => {
            output.add(getRandomNumber(lowerNumber, higherNumber))
        })

        output = Array.from(output).slice(0, total)
    } else {
        Array.from({ length: total }, () => {
            output = [...output, getRandomNumber(lowerNumber, higherNumber)]
        })
    }

    if (sorted) {
        output.sort((a, b) => +a - +b)
    }

    return output
}
