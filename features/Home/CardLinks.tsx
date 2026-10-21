import Link from "next/link";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { RouteItem } from "../../constants/routes";

interface CardLinksProps {
  routes: RouteItem[];
}

const CardLinks = ({ routes }: CardLinksProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "flex-start",
        },
        flexWrap: "wrap",
        gap: 3,
      }}>
      {routes.map(({ key, path, homeName, icon, description, isExternal }) => (
        <Card
          key={key}
          color="secondary"
          sx={{
            flex: "0 0 100%",
            maxWidth: 345,
            padding: 3,
            "@media (min-width:450px)": {
              flex: "0 0 325px",
            },
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Link
              href={path}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{ textDecoration: "none" }}>
              <IconButton
                aria-label={homeName}
                color="primary"
                component="span"
                sx={{
                  "& svg": {
                    fontSize: "55px",
                  },
                }}>
                {icon}
              </IconButton>
            </Link>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {homeName}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
          <CardActions>
            <Link
              href={path}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{ width: "100%", textDecoration: "none" }}>
              <Button
                variant="contained"
                fullWidth
                endIcon={isExternal ? <OpenInNewIcon /> : undefined}
                sx={{
                  "& .MuiButton-endIcon > *:nth-of-type(1)": {
                    fontSize: 15,
                  },
                }}>
                View
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default CardLinks;
