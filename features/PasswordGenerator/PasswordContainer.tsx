import { Stack } from "@mui/material";

interface PasswordContainerProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const PasswordContainer = ({ left, right }: PasswordContainerProps) => {
  return (
    <Stack direction={{ xs: "column", lg: "row" }} sx={{ gap: "0 64px" }}>
      <div>{left}</div>

      <div>{right}</div>
    </Stack>
  );
};

export default PasswordContainer;
