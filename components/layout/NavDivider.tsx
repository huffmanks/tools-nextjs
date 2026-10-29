import { Box, Divider } from "@mui/material";

interface NavDividerProps {
  open: boolean;
  label?: string;
}

export default function NavDivider({ open, label }: NavDividerProps) {
  return open ? (
    <Divider textAlign="left" sx={{ "&::before, &::after": { marginBottom: 3 } }}>
      <Box component="span" color="primary.light" sx={{ textTransform: "uppercase" }}>
        {label}
      </Box>
    </Divider>
  ) : (
    <Divider />
  );
}
