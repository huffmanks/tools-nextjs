import { Grid } from "@mui/material";

interface InputContainerProps {
  top: React.ReactNode;
  center: React.ReactNode;
  bottom: React.ReactNode;
}

const InputContainer = ({ top, center, bottom }: InputContainerProps) => {
  return (
    <>
      <Grid container sx={{ marginBottom: 5 }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            marginBottom: {
              xs: 3,
              md: 0,
            },
            paddingRight: {
              xs: 0,
              md: 5,
            },
          }}>
          {top}
        </Grid>
        <Grid item xs={12} md={3}>
          {center}
        </Grid>
        <Grid item xs={12} md={3}>
          {bottom}
        </Grid>
      </Grid>
    </>
  );
};

export default InputContainer;
