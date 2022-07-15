export const initialValues = {
    slider: 12,
    symbols: true,
    numbers: true,
    lowerCase: true,
    upperCase: true,
    similarCharacters: true,
    showPassword: false,
}

export const marks = [
    {
        value: 8,
        label: 8,
    },
    {
        value: 10,
        label: 10,
    },
    {
        value: 12,
        label: 12,
    },
    {
        value: 14,
        label: 14,
    },
    {
        value: 16,
        label: 16,
    },
    {
        value: 18,
        label: 18,
    },
    {
        value: 20,
        label: 20,
    },
    {
        value: 22,
        label: 22,
    },
    {
        value: 24,
        label: 24,
    },
]

export const passwordOptions = [
    {
        id: 1,
        label: 'Include symbols',
        name: 'symbols',
    },
    {
        id: 2,
        label: 'Include numbers',
        name: 'numbers',
    },
    {
        id: 3,
        label: 'Include lowercase characters',
        name: 'lowerCase',
    },
    {
        id: 4,
        label: 'Include uppercase characters',
        name: 'upperCase',
    },
    {
        id: 5,
        label: 'Exclude similar characters',
        name: 'similarCharacters',
    },
    {
        id: 6,
        label: 'Show password',
        name: 'showPassword',
    },
]

export const symbols = ['!', '#', '$', '%', '*']

export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export const similarCharacters = ['B', '8', 'D', 'O', 'Q', '0', 'I', 'L', '1', 'S', '5', 'Z', '2']
