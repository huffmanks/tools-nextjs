export const initialValues = {
    colorType: 'hex',
    colorSymbol: '#',
    themeColor: '5b21b6',
    placeholder: '5b21b6',
}

export const themeColorOptions = [
    {
        name: 'hex',
        label: 'HEX',
        defaultValue: '5b21b6',
        colorSymbol: '#',
    },
    {
        name: 'rgb',
        label: 'RGB',
        defaultValue: '91, 33, 182',
        colorSymbol: 'rgb(',
        hasEndSymbol: true,
    },
    {
        name: 'hsl',
        label: 'HSL',
        defaultValue: '263, 69%, 42%',
        colorSymbol: 'hsl(',
        hasEndSymbol: true,
    },
]
