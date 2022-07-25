import { useState } from 'react'

import { useFormControls } from '../../../hooks/useFormControls'
import { generatePassword } from '../../../utilities/generatePassword'
import { initialValues } from '../../../constants/passwordGenerator'

import { Box, Button, Stack, Typography } from '@mui/material'

import KeyIcon from '@mui/icons-material/Key'

import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'
import PasswordOutput from '../../../components/PasswordGenerator/PasswordOutput'
import SliderInput from '../../../components/PasswordGenerator/SliderInput'
import PasswordOptions from '../../../components/PasswordGenerator/PasswordOptions'

const PasswordGenerator = () => {
    const { values, handleChange, handleSlider } = useFormControls(initialValues)

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleClick = () => {
        setPassword(generatePassword(values.symbols, values.numbers, values.lowerCase, values.upperCase, values.excludeSimilar, values.slider))
    }

    return (
        <>
            <SEO description='Create a strong password.' title='Password Generator' url='/generate/password' imageUrl='/password-generator.png' />
            <PageTitle>Password Generator</PageTitle>

            <Typography paragraph mb={5}>
                Create a strong password.
            </Typography>

            <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: '0 64px' }}>
                <div>
                    <PasswordOutput password={password} showPassword={showPassword} setShowPassword={setShowPassword} />

                    <SliderInput values={values} handleSlider={handleSlider} />
                </div>

                <div>
                    <PasswordOptions values={values} handleChange={handleChange} />

                    <Box
                        marginBottom={5}
                        sx={{
                            width: {
                                sm: '50%',
                                lg: '100%',
                            },
                            paddingInline: 1,
                        }}>
                        <Button fullWidth variant='contained' onClick={handleClick} endIcon={<KeyIcon />} sx={{ fontSize: 16 }}>
                            Generate
                        </Button>
                    </Box>
                </div>
            </Stack>
        </>
    )
}

export default PasswordGenerator
