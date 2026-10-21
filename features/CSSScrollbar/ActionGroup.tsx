import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button } from "@mui/material";

import { type InitialColors } from "@/constants/popoverColorPicker";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useGlobalState } from "@/hooks/useGlobalState";
import { generateScrollbarStrings } from "@/utils/generateScrollbarStrings";

import { type InitialCssScrollbarValues } from "@/features/CSSScrollbar/constants";

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
    <Box sx={{ position: "absolute", top: 20, right: 20 }}>
      <Button
        variant="contained"
        aria-label="copy"
        size="large"
        onClick={handleCopy}
        endIcon={<ContentCopyIcon fontSize="inherit" />}>
        Copy
      </Button>
    </Box>
  );
};

export default ActionGroup;
