import { Box } from "@mui/material";

import OutputMessage from "../../../components/common/OutputMessage";

const TextOutput = ({ resultRef, values }) => {
  const formatType = values?.outputDelimiter || "newline";

  return (
    <Box sx={{ marginTop: { sm: 6, md: 8 } }}>
      {values?.output?.length > 0 ? (
        <div ref={resultRef}>{formatType === "newline" ? values.output.map((item, i) => <div key={i}>{item}</div>) : <div>{values.output.join(formatType === "comma" ? ", " : " | ")}</div>}</div>
      ) : (
        <OutputMessage message="No items to show." />
      )}
    </Box>
  );
};

export default TextOutput;
