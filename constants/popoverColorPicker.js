export const initialValues = {
    dotColor: '#5b21b6',
    backgroundColor: '#fff',
    ringOuter: '#222',
    ringInner: '#222',
    themeColor: '#5b21b6',
    trackBg: '#e7e7e7',
    trackBorderColor: '#cacaca',
    trackBgHover: '#cfcfcf',
    thumbBg: '#d55959',
    thumbBgHover: '#cf3f3f',
}

export const qrCodePickers = [
    {
        label: 'Primary Colors',
        name: 'dotColor',
        helperText: 'Dot Color',
    },
    {
        name: 'backgroundColor',
        helperText: 'Background Color',
    },
    {
        label: 'Ring Colors',
        name: 'ringOuter',
        helperText: 'Outer Color',
    },
    {
        name: 'ringInner',
        helperText: 'Inner Color',
    },
]

export const scrollbarTrackPickers = [
    {
        label: 'Track styles',
        name: 'trackBg',
        helperText: 'Background Color',
    },
    {
        name: 'trackBorderColor',
        helperText: 'Border Color',
    },
    {
        name: 'trackBgHover',
        helperText: 'Hover Background Color',
    },
]

export const scrollbarThumbPickers = [
    {
        label: 'Thumb Styles',
        name: 'thumbBg',
        helperText: 'Background Color',
    },
    {
        name: 'thumbBgHover',
        helperText: 'Hover Background Color',
    },
]
