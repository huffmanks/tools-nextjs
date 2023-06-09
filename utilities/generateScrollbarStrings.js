import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const generateScrollbarStrings = (value) => {
    const scrollBarHover = !value.isTrackTransparent
        ? `
.scrollbar::-webkit-scrollbar-track:hover,
.scrollbar::-webkit-scrollbar-track:active {
    background-color: ${value.trackBgHover};
}
`
        : ''

    const trackRadius = !value.isTrackTransparent ? `\n    border-radius: ${value.trackRadius}px;` : ''
    const trackBorder = !value.isTrackTransparent ? `\n    border: ${value.trackBorderWidth} ${value.trackBorderStyle} ${value.trackBorderColor};` : ''
    const thumbBgClip = value.isTrackTransparent ? `\n    background-clip: content-box;` : ''
    const thumbBorder = value.isTrackTransparent ? `\n    border: ${Math.floor(value.thickness / 3)}px solid transparent;` : ''

    const DemoBox = styled(Box)`
background-color: rgb(0 0 0 / .3);
width: 400px;
height: 300px;
display: flex;
flex-direction: column;
gap: 20px;
padding: 10px;
overflow-${value.axis}: scroll;

scrollbar-width: ${value.widthFirefox};
scrollbar-color: ${value.thumbBg} ${value.trackBg};

:hover,
:active {
scrollbar-color: ${value.thumbBg} ${value.trackBg};
}

::-webkit-scrollbar {
${value.axis === 'y' ? 'width' : 'height'}: ${value.thickness}px;
overflow-${value.axis}: scroll;
}

::-webkit-scrollbar-track {
background-color: ${!value.isTrackTransparent ? value.trackBg : 'transparent'};
${trackRadius}
${trackBorder}
}

${!value.isTrackTransparent ? '::-webkit-scrollbar-track:hover,' + '::-webkit-scrollbar-track:active{' + 'background-color: ' + value.trackBgHover + ';}' : ''}

::-webkit-scrollbar-thumb {
${thumbBgClip}
background-color: ${value.thumbBg};
border-radius: ${value.thumbRadius}px;
${thumbBorder}
}

::-webkit-scrollbar-thumb:hover,
::-webkit-scrollbar-thumb:active {
background-color: ${value.thumbBgHover};
}
`

    const codeString = `/* ===== Scrollbar CSS ===== */
/* Firefox */
.scrollbar {
    scrollbar-width: ${value.widthFirefox};
    scrollbar-color: ${value.thumbBg} ${value.trackBg};
}

.scrollbar:hover,
.scrollbar:active {
    scrollbar-color: ${value.thumbBg} ${value.trackBg};
}

/* Chrome, Edge and Safari */
.scrollbar::-webkit-scrollbar {
    ${value.axis === 'y' ? 'width' : 'height'}: ${value.thickness}px;
    overflow-${value.axis}: scroll;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: ${!value.isTrackTransparent ? value.trackBg : 'transparent'};${trackRadius}${trackBorder}
}
${scrollBarHover}
.scrollbar::-webkit-scrollbar-thumb {${thumbBgClip}
    background-color: ${value.thumbBg};
    border-radius: ${value.thumbRadius}px;${thumbBorder}
}

.scrollbar::-webkit-scrollbar-thumb:hover,
.scrollbar::-webkit-scrollbar-thumb:active {
    background-color: ${value.thumbBgHover};
}`

    return { DemoBox, codeString }
}
