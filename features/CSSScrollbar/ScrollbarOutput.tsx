import { Box, Grid } from "@mui/material";

import type { InitialColors } from "@/constants/popoverColorPicker";

import ActionGroup from "@/features/CSSScrollbar/ActionGroup";
import CodeBlock from "@/features/CSSScrollbar/CodeBlock";
import type { InitialCssScrollbarValues } from "@/features/CSSScrollbar/types";

interface ScrollbarOutputProps {
  values: InitialCssScrollbarValues;
  colors: InitialColors;
}

const ScrollbarOutput = ({ values, colors }: ScrollbarOutputProps) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 7 }}>
        <Box sx={{ position: "relative" }}>
          <ActionGroup values={values} colors={colors} />

          <CodeBlock values={values} colors={colors} />
        </Box>
      </Grid>
    </>
  );
};

export default ScrollbarOutput;
