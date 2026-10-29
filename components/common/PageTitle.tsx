import { Typography } from "@mui/material";

interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <Typography variant="h2" component="h1">
      {children}
    </Typography>
  );
}
