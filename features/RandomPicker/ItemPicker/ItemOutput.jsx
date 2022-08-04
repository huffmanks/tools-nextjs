import { Grid } from '@mui/material'

import OutputMessage from '../../../components/common/OutputMessage'

const ItemOutput = ({ resultRef, items }) => {
    return (
        <Grid item xs={12} md={5}>
            {items?.output?.length > 0 ? (
                <div ref={resultRef}>
                    {items.output.map((item, i) => (
                        <div key={i}>{item}</div>
                    ))}
                </div>
            ) : (
                <OutputMessage message='No items to show.' />
            )}
        </Grid>
    )
}

export default ItemOutput
