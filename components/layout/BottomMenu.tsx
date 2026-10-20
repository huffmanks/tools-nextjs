import { useEffect, useRef } from "react";

import { BottomNavigation, BottomNavigationAction, Box, CssBaseline, Paper } from "@mui/material";
import { NavItem } from "../../constants/routes";

interface BottomMenuProps {
  screen: string;
  handleScreen: (_: unknown, newScreen: string) => void;
  navItems: NavItem[];
  isFocused?: boolean;
  activeListId?: string;
  children: React.ReactNode;
}

const BottomMenu = ({ screen, handleScreen, navItems, isFocused, activeListId, children }: BottomMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.ownerDocument.body.scrollTop = 0;
  }, [screen]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      {children}

      <Paper
        sx={{ position: "fixed", bottom: isFocused ? "-56px" : 0, left: { xs: 57, sm: 65 }, right: 0, zIndex: 2 }}
        elevation={3}>
        <BottomNavigation showLabels value={screen} onChange={handleScreen}>
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
              disabled={!activeListId && item.editIcon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomMenu;
