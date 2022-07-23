export const generateRandomNumbers = (total, lowerNumber, higherNumber, unique, sorted) => {
    let output = unique ? new Set() : []

    if (unique) {
        Array.from({ length: total }, () => {
            output.add(Math.floor(Math.random() * (higherNumber - lowerNumber + 1) + lowerNumber))
        })
        output = Array.from(output)
    } else {
        Array.from({ length: total }, () => {
            output = [...output, Math.floor(Math.random() * (higherNumber - lowerNumber + 1) + lowerNumber)]
        })
    }

    if (sorted) {
        output.sort((a, b) => +a - +b)
    }

    return output
}
