import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import { ipsumFormatTabs } from "../../constants/ipsum";

const IpsumOutput = ({ values, handleCopy }) => {
  const [activeTab, setActiveTab] = useState("plaintext");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const currentDisplayContent = values.output?.[activeTab] || "";

  return (
    <Grid item xs={12} md={7}>
      <Paper
        variant="outlined"
        sx={{
          p: {
            xs: 1.5,
            md: 3,
          },
          display: "flex",
          flexDirection: "column",
          minHeight: "500px",
          backgroundColor: "#2a2a2a",
        }}>
        <Box sx={{ borderBottom: 1, mb: 2, borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit" indicatorColor="primary" aria-label="output format tabs">
            {ipsumFormatTabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} sx={{ fontWeight: "bold" }} />
            ))}
          </Tabs>

          <Button variant="contained" color="primary" startIcon={<ContentCopyIcon />} onClick={() => handleCopy(currentDisplayContent)} disabled={!currentDisplayContent}>
            Copy
          </Button>
        </Box>

        <Box
          component="pre"
          className="global-scrollbar"
          sx={{
            flexGrow: 1,
            backgroundColor: "#1e1e1e",
            p: 2,
            mb: 3,
            borderRadius: 1,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxHeight: "400px",
            color: "inherit",
          }}>
          <code>{currentDisplayContent || "Select elements and hit 'Generate' to create mockups..."}</code>
        </Box>

        {activeTab !== "plaintext" && values.output?.html && (
          <Box sx={{ mt: "auto" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", opacity: 0.8 }}>
              Preview
            </Typography>
            <Box
              className="global-scrollbar"
              sx={{
                border: "1px dashed rgba(255, 255, 255, 0.2)",
                p: 2,
                borderRadius: 1,
                maxHeight: "400px",
                overflowY: "auto",
                backgroundColor: "#1e1e1e",
                color: "inherit",
                "& h1, & h2, & h3, & h4": { mt: 0, mb: 1, color: "inherit" },
                "& p": { mb: 3, lineHeight: 1.6, opacity: 0.9 },
                "& ol": { mb: 4, pl: 4 },
                "& ul": { mb: 4, pl: 4 },
                "& table": { width: "100%", borderCollapse: "collapse", mb: 4 },
                "& th, & td": { border: "1px solid rgba(255, 255, 255, 0.15)", p: "8px 12px", textAlign: "left", fontSize: "0.85rem" },
                "& th": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                "& blockquote": { borderLeft: "4px solid currentColor", pl: 2, mx: 0, mb: 4, opacity: 0.85, fontStyle: "italic" },
              }}
              dangerouslySetInnerHTML={{ __html: values.output?.html }}
            />
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default IpsumOutput;
