import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const generateScrollbarStrings = (values, colors) => {
    const scrollBarHover = !values.isTrackTransparent
        ? `
.scrollbar::-webkit-scrollbar-track:hover,
.scrollbar::-webkit-scrollbar-track:active {
    background-color: ${colors.trackBgHover};
}
`
        : ''

    const trackRadius = !values.isTrackTransparent ? `\n    border-radius: ${values.trackRadius}px;` : ''
    const trackBorder = !values.isTrackTransparent ? `\n    border: ${values.trackBorderWidth}px ${values.trackBorderStyle} ${colors.trackBorderColor};` : ''
    const thumbBgClip = values.isTrackTransparent ? `\n    background-clip: content-box;` : ''
    const thumbBorder = values.isTrackTransparent ? `\n    border: ${Math.floor(values.thickness / 3)}px solid transparent;` : ''

    const DemoBox = styled(Box)`

width: ${values.axis === 'y' ? 'auto' : '50%'};
height: ${values.axis === 'y' ? '300px' : 'auto'};
background-color: #282c34;
border-radius: 4.2px;

overflow-${values.axis}: scroll;

scrollbar-width: ${values.widthFirefox};
scrollbar-color: ${colors.thumbBg} ${values.isTrackTransparent ? 'transparent' : colors.trackBg};

:hover,
:active {
scrollbar-color: ${colors.thumbBgHover} ${values.isTrackTransparent ? 'transparent' : colors.trackBg};
}

::-webkit-scrollbar {
${values.axis === 'y' ? 'width' : 'height'}: ${values.thickness}px;
overflow-${values.axis}: scroll;
}

::-webkit-scrollbar-track {
background-color: ${!values.isTrackTransparent ? colors.trackBg : 'transparent'};
${trackRadius}
${trackBorder}
}

${!values.isTrackTransparent ? '::-webkit-scrollbar-track:hover,' + '::-webkit-scrollbar-track:active{' + 'background-color: ' + colors.trackBgHover + ';}' : ''}

::-webkit-scrollbar-thumb {
${thumbBgClip}
background-color: ${colors.thumbBg};
border-radius: ${values.thumbRadius}px;
${thumbBorder}
}

::-webkit-scrollbar-thumb:hover,
::-webkit-scrollbar-thumb:active {
background-color: ${colors.thumbBgHover};
}
`

    const codeString = `/* ===== Scrollbar CSS ===== */
/* Firefox */
.scrollbar {
    scrollbar-width: ${values.widthFirefox};
    scrollbar-color: ${colors.thumbBg} ${values.isTrackTransparent ? 'transparent' : colors.trackBg};
}

.scrollbar:hover,
.scrollbar:active {
    scrollbar-color: ${colors.thumbBgHover} ${values.isTrackTransparent ? 'transparent' : colors.trackBg};
}

/* Chrome, Edge and Safari */
.scrollbar::-webkit-scrollbar {
    ${values.axis === 'y' ? 'width' : 'height'}: ${values.thickness}px;
    overflow-${values.axis}: scroll;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: ${!values.isTrackTransparent ? colors.trackBg : 'transparent'};${trackRadius}${trackBorder}
}
${scrollBarHover}
.scrollbar::-webkit-scrollbar-thumb {${thumbBgClip}
    background-color: ${colors.thumbBg};
    border-radius: ${values.thumbRadius}px;${thumbBorder}
}

.scrollbar::-webkit-scrollbar-thumb:hover,
.scrollbar::-webkit-scrollbar-thumb:active {
    background-color: ${colors.thumbBgHover};
}`

    return { DemoBox, codeString }
}
