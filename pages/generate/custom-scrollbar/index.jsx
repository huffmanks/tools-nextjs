import { useState } from 'react'

import { Button } from '@mui/material'

import Demo from '../../../features/CustomScrollbar/Demo'
import CodeBlock from '../../../features/CustomScrollbar/CodeBlock'
import { initialValues } from '../../../constants/customScrollbar'

const CustomScrollbar = () => {
    const [value, setValue] = useState(initialValues)

    const handleClick = (name) => {
        if (name === 'isTrackTransparent') {
            setValue((prev) => ({
                ...prev,
                isTrackTransparent: !prev.isTrackTransparent,
            }))
        }
    }

    return (
        <>
            <div style={{ maxWidth: 1200, display: 'flex', gap: 50 }}>
                <div>
                    <Button onClick={() => handleClick('isTrackTransparent')}>{value.isTrackTransparent ? 'See through' : 'Color'}</Button>
                </div>
                <Demo value={value} />

                <CodeBlock value={value} />
            </div>
        </>
    )
}

export default CustomScrollbar
