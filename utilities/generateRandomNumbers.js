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

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min)
}
