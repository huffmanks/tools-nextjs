import { Box } from '@mui/material'

const Output = ({ number, isLottery, isLotteryPower }) => {
    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: isLotteryPower ? '#ba000d' : 'background.altThree',
                borderRadius: isLottery ? '50%' : 2,
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: isLottery ? 24 : 'fit-content', height: isLottery ? 24 : 'auto' }}>{number}</Box>
        </Box>
    )
}

export default Output
