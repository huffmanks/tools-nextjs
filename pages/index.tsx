import { useState } from "react";

import { Typography } from "@mui/material";

import {
  calculateRoutes,
  convertRoutes,
  formatRoutes,
  generateRoutes,
  navItems,
  pickerRoutes,
} from "@/constants/routes";

import CardLinks from "@/features/Home/CardLinks";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";
import BottomMenu from "@/components/layout/BottomMenu";

const Home = () => {
  const [screen, setScreen] = useState("calculate");

  const handleScreen = (_: unknown, newScreen: string) => {
    setScreen(newScreen);
  };
  return (
    <>
      <SEO description="List of tools to help speed web development." title="Home" url="/" />

      <PageTitle>Home</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        List of tools to help speed web development.
      </Typography>

      <BottomMenu screen={screen} handleScreen={handleScreen} navItems={navItems}>
        {screen === "calculate" && <CardLinks routes={calculateRoutes} />}

        {screen === "convert" && <CardLinks routes={convertRoutes} />}

        {screen === "format" && <CardLinks routes={formatRoutes} />}

        {screen === "generate" && <CardLinks routes={generateRoutes} />}

        {screen === "picker" && <CardLinks routes={pickerRoutes} />}
      </BottomMenu>
    </>
  );
};

export default Home;
