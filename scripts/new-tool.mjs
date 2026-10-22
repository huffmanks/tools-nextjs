import fs from "node:fs/promises";
import path from "node:path";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

const CATEGORIES = ["calculate", "format", "generate", "picker"];

const rl = readline.createInterface({ input, output });

async function prompt(query) {
  const answer = await rl.question(query);
  return answer.trim();
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, g1) => g1.toUpperCase());
}

function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

async function main() {
  let categoryInput = await prompt(
    `Choose a category (${CATEGORIES.join(", ")}, or enter a new one): `
  );
  if (!categoryInput) {
    console.error("Category cannot be empty.");
    rl.close();
    process.exit(1);
  }

  const category = categoryInput.toLowerCase();

  const toolInput = await prompt("Enter tool name (kebab-case): ");
  if (!toolInput) {
    console.error("Tool name cannot be empty.");
    rl.close();
    process.exit(1);
  }

  const toolNameKebab = toolInput.toLowerCase().replace(/\s+/g, "-");
  const toolNamePascal = toPascalCase(toolNameKebab);

  const pageDir = path.join("pages", category, toolNameKebab);
  const featuresDir = path.join("features", toolNamePascal);

  await fs.mkdir(pageDir, { recursive: true });
  await fs.mkdir(featuresDir, { recursive: true });

  const pageContent = `import { Grid, Typography } from "@mui/material";

import ${toolNamePascal}Form from "@/features/${toolNamePascal}/${toolNamePascal}Form";
import { use${toolNamePascal}FormControls } from "@/features/${toolNamePascal}/use${toolNamePascal}FormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

const ${toolNamePascal} = () => {
  const { values, errors, handleChange, handleReset } = use${toolNamePascal}FormControls();

  return (
    <>
      <SEO
        description="Description..."
        title="${toolNamePascal}"
        url="/${category}/${toolNameKebab}"
        imageUrl="/${toolNameKebab}.png"
      />

      <PageTitle>${toolNamePascal}</PageTitle>

      <Typography paragraph mb={5}>
        Description...
      </Typography>

      <Grid container spacing={3}>
        <${toolNamePascal}Form
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleReset={handleReset}
        />
      </Grid>
    </>
  );
};

export default ${toolNamePascal};
`;

  const formContent = `import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  FormControl,
  Grid,
  type SelectChangeEvent
} from "@mui/material";

import { ${toolNamePascal}_FIELD_NAME_Select, ${toolNamePascal}_FIELD_NAME_Input } from "@/features/${toolNamePascal}/constants";
import type { ${toolNamePascal}Errors } from "@/features/${toolNamePascal}/types";

interface ${toolNamePascal}FormProps {
  values: string ;
  errors: ${toolNamePascal}Errors;
  handleChange: (
    event:
      React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element> | SelectChangeEvent<string>
  ) => void;
  handleReset: () => void;
}

const ${toolNamePascal}Form = ({ values, errors, handleChange, handleReset }: ${toolNamePascal}FormProps) => {

  return (
    <Box component="form" autoComplete="off" sx={{ width: "100%", paddingLeft: 3, paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth error={!!errors[${toolNamePascal}_FIELD_NAME_Select.name]}>
            {/* Input/Select etc. */}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              error={!!errors[${toolNamePascal}_FIELD_NAME_Input.name]}>
              {/* Input/Select etc. */}
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleReset} startIcon={<RefreshIcon />}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ${toolNamePascal}Form;
`;

  const formControlsContent = `import { useState } from "react";

import type { SelectChangeEvent } from "@mui/material";

import { initial${toolNamePascal}Values } from "@/features/${toolNamePascal}/constants";
import type { ${toolNamePascal}Errors, ${toolNamePascal}Values } from "@/features/${toolNamePascal}/types";

export const use${toolNamePascal}FormControls = () => {
  const [values, setValues] = useState<${toolNamePascal}Values>(initial${toolNamePascal}Values);
  const [errors, setErrors] = useState<${toolNamePascal}Errors>({});

  const handleChange = (
    e:
      React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element> | SelectChangeEvent<string>
  ) => {
        const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReset = () => {
    setValues(initial${toolNamePascal}Values);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleReset,
  };
};
`;

  await fs.writeFile(path.join(pageDir, "index.tsx"), pageContent);
  await fs.writeFile(path.join(featuresDir, "constants.ts"), "");
  await fs.writeFile(path.join(featuresDir, "types.ts"), "");
  await fs.writeFile(path.join(featuresDir, "utils.ts"), "");
  await fs.writeFile(path.join(featuresDir, `${toolNamePascal}Form.tsx`), formContent);
  await fs.writeFile(
    path.join(featuresDir, `use${toolNamePascal}FormControls.tsx`),
    formControlsContent
  );

  console.log(`Successfully created tool "${toolNamePascal}" under category "${category}".`);
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
