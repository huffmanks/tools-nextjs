import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

import { Box } from "@mui/material";

import { InitialColors } from "../../constants/popoverColorPicker";
import { generateScrollbarStrings } from "../../utilities/generateScrollbarStrings";
import { InitialCssScrollbarValues } from "./constants";

SyntaxHighlighter.registerLanguage("css", css);

interface CodeBlockProps {
  values: InitialCssScrollbarValues;
  colors: InitialColors;
}

const CodeBlock = ({ values, colors }: CodeBlockProps) => {
  const { codeString } = generateScrollbarStrings(values, colors);
  return (
    <Box sx={{ marginBottom: "40px", fontSize: 14 }}>
      <SyntaxHighlighter
        language="css"
        customStyle={{ margin: 0, padding: "20px 10px" }}
        style={oneDark}
        wrapLines={true}
        showLineNumbers={true}>
        {codeString}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock;
