import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button } from "@mui/material";

import { InitialCssScrollbarValues } from "../../constants/cssScrollbar";
import { InitialColors } from "../../constants/popoverColorPicker";
import { useGlobalState } from "../../hooks/useContext";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { generateScrollbarStrings } from "../../utilities/generateScrollbarStrings";

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
