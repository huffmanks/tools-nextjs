import { Box } from "@mui/material";

interface OutputMessageProps {
  message: string;
  extraMb?: boolean;
}

export default function OutputMessage({ message, extraMb }: OutputMessageProps) {
  return (
    <Box
      sx={{
        width: "fit-content",
        marginBottom: extraMb ? 6 : 0,
        padding: "8px 12px",
        backgroundColor: "background.altTwo",
        borderRadius: 1,
      }}>
      {message}
    </Box>
  );
}
