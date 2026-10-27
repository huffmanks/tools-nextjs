import { Grid } from "@mui/material";

interface InputContainerProps {
  top: React.ReactNode;
  center: React.ReactNode;
  bottom: React.ReactNode;
}

const InputContainer = ({ top, center, bottom }: InputContainerProps) => {
  return (
    <>
      <Grid container sx={{ marginBlockEnd: 5 }}>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            marginBlockEnd: {
              xs: 3,
              md: 0,
            },
            paddingInlineEnd: {
              xs: 0,
              md: 5,
            },
          }}>
          {top}
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>{center}</Grid>
        <Grid size={{ xs: 12, md: 3 }}>{bottom}</Grid>
      </Grid>
    </>
  );
};

export default InputContainer;
