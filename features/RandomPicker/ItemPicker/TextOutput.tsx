import { Box } from "@mui/material";

import OutputMessage from "../../../components/common/OutputMessage";
import { ItemPickerValues } from "../../../constants/itemPicker";

interface TextOutputProps {
  resultRef: React.RefObject<HTMLElement | null>;
  values: ItemPickerValues;
}

const TextOutput = ({ resultRef, values }: TextOutputProps) => {
  const formatType = values?.outputDelimiter || "newline";

  return (
    <Box sx={{ marginTop: { sm: 6, md: 8 } }}>
      {values?.output?.length > 0 ? (
        <div ref={resultRef as React.RefObject<HTMLDivElement>}>
          {formatType === "newline" ? (
            values.output.map((item, i) => <div key={i}>{item}</div>)
          ) : (
            <div>{values.output.join(formatType === "comma" ? ", " : " | ")}</div>
          )}
        </div>
      ) : (
        <OutputMessage message="No items to show." />
      )}
    </Box>
  );
};

export default TextOutput;
