export const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    cellPhone: '',
    fax: '',
    title: '',
    website: '',
    companyName: '',
    department: '',
    address: '',
    cityState: '',
    zipCode: '',
    colorType: 'hex',
    colorSymbol: '#',
    themeColor: '5b21b6',
    placeholder: '5b21b6',
}

export const emailInputs = [
    {
        name: 'fullName',
        label: 'Full Name',
        placeholder: 'Cypress Gray',
        required: true,
        gridSm: 6,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'email@domain.tld',
        required: true,
        gridSm: 6,
    },
    {
        name: 'phone',
        label: 'Phone',
        placeholder: '123-456-7890',
        required: true,
        gridSm: 4,
    },
    {
        name: 'cellPhone',
        label: 'Cell Phone',
        placeholder: '123-456-7890',
        required: false,
        gridSm: 4,
    },
    {
        name: 'fax',
        label: 'Fax',
        placeholder: '123-456-7890',
        required: false,
        gridSm: 4,
    },
    {
        name: 'title',
        label: 'Title',
        placeholder: 'Web Developer',
        required: true,
        gridSm: 6,
    },
    {
        name: 'website',
        label: 'Website',
        placeholder: 'https://tools.huffmanks.com',
        required: false,
        gridSm: 6,
    },
    {
        name: 'companyName',
        label: 'Company Name',
        placeholder: 'Web Tools',
        required: false,
        gridSm: 6,
    },
    {
        name: 'department',
        label: 'Department',
        placeholder: 'Web',
        required: false,
        gridSm: 6,
    },
    {
        name: 'address',
        label: 'Address',
        placeholder: '3907 Lowndes Hill Park Road',
        required: false,
        gridSm: 4,
    },
    {
        name: 'cityState',
        label: 'City/State',
        placeholder: 'Bakersfield, CA',
        required: false,
        gridSm: 4,
    },
    {
        name: 'zipCode',
        label: 'Zip Code',
        placeholder: '93307',
        required: false,
        gridSm: 4,
    },
]

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
