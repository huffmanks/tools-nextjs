export const initialValues = {
    originalWidth: '',
    originalHeight: '',
    selectedType: 'width',
    newSize: '',
    newWidth: '',
    newHeight: '',
    aspectRatio: '',
    aspectMultiplier: '',
    dimensions: '',
}

export const aspectInputs = [
    {
        name: 'originalWidth',
        label: 'Width',
        placeholder: '1920',
    },
    {
        name: 'originalHeight',
        label: 'Height',
        placeholder: '1080',
    },
    {
        name: 'newSize',
        label: 'Width',
        placeholder: '500',
        isDynamic: true,
    },
]

export const aspectOutput = [
    {
        name: 'newWidth',
        label: 'Width',
    },
    {
        name: 'newHeight',
        label: 'Height',
    },
    {
        name: 'aspectRatio',
        label: 'Aspect Ratio',
    },
    {
        name: 'aspectMultiplier',
        label: 'Aspect Multiplier',
    },
]
