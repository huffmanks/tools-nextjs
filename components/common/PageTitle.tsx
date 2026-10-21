import { Typography } from "@mui/material";

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Typography variant="h2" component="h1">
      {children}
    </Typography>
  );
};

export default PageTitle;
