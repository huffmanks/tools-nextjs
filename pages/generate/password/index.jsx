import { usePasswordGeneratorFormControls } from '../../../features/PasswordGenerator/usePasswordGeneratorFormControls'

import { Button, Typography } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import PasswordContainer from '../../../features/PasswordGenerator/PasswordContainer'
import PasswordOutput from '../../../features/PasswordGenerator/PasswordOutput'
import SliderInput from '../../../features/PasswordGenerator/SliderInput'
import PasswordOptions from '../../../features/PasswordGenerator/PasswordOptions'
import RandomKeyGens from '../../../features/PasswordGenerator/RandomKeyGens'

const PasswordGenerator = () => {
    const { values, handleChange, handleSlider, handleClick, handleShowPassword } = usePasswordGeneratorFormControls()

    return (
        <>
            <SEO description='Create a strong password.' title='Password Generator' url='/generate/password' imageUrl='/password-generator.png' />

            <PageTitle>Password Generator</PageTitle>

            <Typography paragraph mb={5}>
                Create a strong password.
            </Typography>

            <PasswordContainer
                top={
                    <>
                        <PasswordOutput password={values.password} showPassword={values.showPassword} handleShowPassword={handleShowPassword} />

                        <SliderInput slider={values.slider} handleSlider={handleSlider} />
                        <RandomKeyGens />
                    </>
                }
                center={<PasswordOptions values={values} handleChange={handleChange} />}
                bottom={
                    <Button fullWidth variant='contained' onClick={handleClick} endIcon={<KeyIcon />} sx={{ fontSize: 16 }}>
                        Generate
                    </Button>
                }
            />
        </>
    )
}

export default PasswordGenerator
