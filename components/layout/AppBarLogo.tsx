import { Box, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

interface AppBarLogoProps {
  logoSize: number | string;
  textSize: number | string;
  open?: boolean;
}

export default function AppBarLogo({ logoSize, textSize, open }: AppBarLogoProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          "@media (min-width:600px)": {
            ...(open && { display: "none" }),
          },
          "@media (max-width:599px)": {
            ...(open === true && { display: "none" }),
          },
        }}>
        <Box
          sx={{
            width: logoSize,
            height: logoSize,
          }}>
          <SvgIcon
            viewBox="0 0 20 20"
            sx={{
              width: logoSize,
              height: logoSize,
              color: "icon.main",
            }}>
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </SvgIcon>
        </Box>

        <Typography
          sx={{
            paddingBlockEnd: "5px",
            fontSize: textSize,
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            letterSpacing: 2,
          }}>
          stratools
        </Typography>
      </Box>
    </>
  );
}
