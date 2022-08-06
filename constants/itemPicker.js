export const initialValues = {
    total: 1,
    inputDelimiter: 'newline',
    outputDelimiter: 'newline',
    list: '',
    output: [],
}

export const delimiterSelects = [
    {
        value: 'inputDelimiter',
        label: 'Input',
    },
    {
        value: 'outputDelimiter',
        label: 'Output',
    },
]

export const delimiterOptions = [
    {
        value: 'newline',
        label: 'Newline',
    },
    {
        value: 'comma',
        label: 'Comma',
    },
    {
        value: 'pipe',
        label: 'Pipe',
    },
]
