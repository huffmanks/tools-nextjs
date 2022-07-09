import { useMemo } from 'react'
import { RgbaStringColorPicker } from 'react-colorful'

import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'

extend([namesPlugin])

const Colord = ({ color, ...rest }) => {
    const rgbaString = useMemo(() => {
        return colord(color).toRgbString()
    }, [color])

    return (
        <div className='custom-layout'>
            <RgbaStringColorPicker color={rgbaString} {...rest} />
        </div>
    )
}

export default Colord
