import KeyIcon from "@mui/icons-material/Key";
import { Box, Button, Typography } from "@mui/material";

import PasswordContainer from "@/features/PasswordGenerator/PasswordContainer";
import PasswordOptions from "@/features/PasswordGenerator/PasswordOptions";
import PasswordOutput from "@/features/PasswordGenerator/PasswordOutput";
import PasswordType from "@/features/PasswordGenerator/PasswordType";
import RandomKeyGens from "@/features/PasswordGenerator/RandomKeyGens";
import SliderInput from "@/features/PasswordGenerator/SliderInput";
import { usePasswordGeneratorFormControls } from "@/features/PasswordGenerator/usePasswordGeneratorFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function PasswordGenerator() {
  const { values, handleChange, handleSlider, handleClick, handleShowPassword } =
    usePasswordGeneratorFormControls();

  return (
    <>
      <SEO
        description="Create a strong password or a random keygen."
        title="Password Generator"
        url="/generate/password"
        imageUrl="/password-generator.png"
      />

      <PageTitle>Password Generator</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Create a strong password or a random keygen.
      </Typography>

      <PasswordType values={values} handleChange={handleChange} />

      <Box sx={{ paddingBlockEnd: 8 }}>
        {values.passwordType === "keygen" ? (
          <PasswordContainer
            left={
              <>
                <RandomKeyGens values={values} />
              </>
            }
          />
        ) : (
          <PasswordContainer
            left={
              <>
                <PasswordOutput
                  password={values.password}
                  showPassword={values.showPassword}
                  handleShowPassword={handleShowPassword}
                />

                <SliderInput slider={values.slider} handleSlider={handleSlider} />
              </>
            }
            right={<PasswordOptions values={values} handleChange={handleChange} />}
          />
        )}
        <Button
          variant="contained"
          onClick={handleClick}
          endIcon={<KeyIcon />}
          sx={{ fontSize: 16 }}>
          Generate
        </Button>
      </Box>
    </>
  );
}
