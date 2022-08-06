import { Grid } from '@mui/material'

import OutputMessage from '../../../components/common/OutputMessage'

const ItemOutput = ({ resultRef, values }) => {
    return (
        <Grid item xs={12} md={5}>
            {values?.output?.length > 0 ? (
                <div ref={resultRef}>
                    {values.output.map((item, i) => (
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
