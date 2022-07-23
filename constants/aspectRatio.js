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
        label: 'New Width',
        placeholder: '400',
    },
    {
        name: 'newHeight',
        label: 'New Height',
        placeholder: '225',
    },
    {
        name: 'aspectRatio',
        label: 'Aspect Ratio',
        placeholder: '16:9',
    },
    {
        name: 'aspectMultiplier',
        label: 'Aspect Multiplier',
        placeholder: '1.78',
    },
]
