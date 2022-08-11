import { useMemo } from 'react'
import { RgbaStringColorPicker } from 'react-colorful'

import { Box } from '@mui/material'

import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
extend([namesPlugin])

const Colord = ({ color, ...rest }) => {
    const rgbaString = useMemo(() => {
        return colord(color).toRgbString()
    }, [color])

    return (
        <Box
            className='custom-layou'
            sx={{
                '& .react-colorful': {
                    width: '100%',
                    minHeight: 300,
                    marginBottom: 4,
                    padding: 2,
                    borderRadius: 1,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'background.altFour',
                },
                '& .react-colorful__saturation': {
                    marginBlock: 2,
                    borderRadius: 1,
                },
                '& .react-colorful__hue': {
                    order: '-1',
                    borderRadius: 1,
                },

                '& .react-colorful__hue, .react-colorful__alpha': {
                    height: '35px',
                    borderRadius: 1,
                },

                '& .react-colorful__hue-pointer, .react-colorful__alpha-pointer': {
                    width: '20px',
                    height: '20px',
                },
            }}>
            <RgbaStringColorPicker color={rgbaString} {...rest} />
        </Box>
    )
}

export default Colord
