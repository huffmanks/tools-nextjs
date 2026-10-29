import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button } from "@mui/material";

import type { InitialColors } from "@/constants/popoverColorPicker";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useGlobalState } from "@/hooks/useGlobalState";

import type { InitialCssScrollbarValues } from "@/features/CSSScrollbar/types";
import { generateScrollbarStrings } from "@/features/CSSScrollbar/utils";

interface ActionGroupProps {
  values: InitialCssScrollbarValues;
  colors: InitialColors;
}

const ActionGroup = ({ values, colors }: ActionGroupProps) => {
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(false);

  const { codeString } = generateScrollbarStrings(values, colors);

  const handleCopy = async () => {
    const copySuccess = await copy(codeString);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  return (
    <Box sx={{ position: "absolute", top: 10, right: 8 }}>
      <Button
        variant="contained"
        aria-label="copy"
        size="large"
        onClick={handleCopy}
        endIcon={<ContentCopyIcon fontSize="inherit" />}
        sx={{
          gap: 1,
          minWidth: { xs: "auto", sm: 8 },
          paddingInline: { xs: 1, sm: 2.75 },
          "& .MuiButton-endIcon": {
            marginInline: { xs: 0 },
          },
        }}>
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          Copy
        </Box>
      </Button>
    </Box>
  );
};

export default ActionGroup;
