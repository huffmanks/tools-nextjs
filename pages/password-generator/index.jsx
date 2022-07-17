import { useState } from 'react'

import { useFormControls } from '../../hooks/useFormControls'
import { generatePassword } from '../../utilities/generatePassword'
import { initialValues } from '../../constants/passwordGenerator'

import { Box, Button } from '@mui/material'

import KeyIcon from '@mui/icons-material/Key'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import Password from '../../components/PasswordGenerator/Password'
import SliderInput from '../../components/PasswordGenerator/SliderInput'
import PasswordOptions from '../../components/PasswordGenerator/PasswordOptions'

const PasswordGenerator = () => {
    const { values, handleChange, handleSlider } = useFormControls(initialValues)

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleClick = () => {
        setPassword(generatePassword(values.symbols, values.numbers, values.lowerCase, values.upperCase, values.excludeSimilar, values.slider))
    }

    return (
        <>
            <SEO description='Create a strong password.' title='Password Generator' url='/password-generator' />
            <PageTitle>Password Generator</PageTitle>

            <Password password={password} showPassword={showPassword} setShowPassword={setShowPassword} />

            <SliderInput values={values} handleSlider={handleSlider} />

            <PasswordOptions values={values} handleChange={handleChange} />

            <Box marginBottom={5}>
                <Button
                    size='large'
                    variant='contained'
                    onClick={handleClick}
                    endIcon={<KeyIcon />}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: 'auto',
                        },
                    }}>
                    Generate
                </Button>
            </Box>
        </>
    )
}

export default PasswordGenerator
