import Link from "next/link";
import { NextRouter } from "next/router";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { RouteItem } from "../../constants/routes";
import NavDivider from "./NavDivider";

interface NavItemProps {
  router: NextRouter;
  routes: RouteItem[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  isHomePage?: boolean;
}

const NavItem = ({ router, routes, open, setOpen, label, isHomePage }: NavItemProps) => {
  return (
    <>
      {!isHomePage && <NavDivider open={open} label={label} />}
      <List>
        {routes.map(({ key, path, name, icon, isExternal }) => (
          <ListItem key={key} disablePadding sx={{ display: "block" }}>
            <Link
              href={path}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{ textDecoration: "none" }}>
              <ListItemButton
                selected={router.pathname === path ? true : false}
                onClick={() => setOpen(false)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}>
                  {icon}
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText
                      primary={name}
                      sx={{
                        flex: "initial",
                        color: "#fff",
                        "& .MuiListItemText-primary": {
                          fontSize: "15px",
                        },
                      }}
                    />
                    {isExternal && <OpenInNewIcon sx={{ fontSize: 13, color: "text.disabled", ml: 1 }} />}
                  </>
                )}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NavItem;
