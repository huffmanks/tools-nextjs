import { useCallback, useRef, useState } from "react";

import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { HexColorPicker } from "react-colorful";

import { initialPopoverColorPickerValues } from "@/constants/popoverColorPicker";
import { useClickOutside } from "@/hooks/useClickOutside";

import HexColorInputCustom from "@/components/common/HexColorInputCustom";

interface PopoverColorPickerProps {
  label?: string;
  name?: string;
  value?: string;
  helperText?: string;
  handleBlur?: (name?: string, color?: string) => void;
}

export default function PopoverColorPicker({
  label,
  name,
  value,
  helperText,
  handleBlur,
}: PopoverColorPickerProps) {
  const popover = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState(value || initialPopoverColorPickerValues[name] || "#5b21b6");
  const [prevValue, setPrevValue] = useState(value);
  const [isOpen, toggle] = useState(false);

  if (value !== prevValue) {
    setPrevValue(value);
    setColor(value || initialPopoverColorPickerValues[name] || "#5b21b6");
  }

  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  const handleColorBlur = useCallback(() => {
    handleBlur?.(name, color);
  }, [handleBlur, name, color]);

  return (
    <div>
      {label && (
        <Typography variant="subtitle1" sx={{ marginBlockEnd: 1, marginBlockStart: 2 }}>
          {label}
        </Typography>
      )}

      <Stack sx={{ position: "relative", flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Box
          role="button"
          tabIndex={0}
          aria-label="Choose color"
          aria-expanded={isOpen}
          sx={{
            width: "28px",
            height: "28px",
            backgroundColor: color,
            border: "2px solid #fefefe",
            borderRadius: 1,
            cursor: "pointer",
          }}
          onClick={() => toggle((prev) => !prev)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggle((prev) => !prev);
            }
          }}
        />

        {isOpen && (
          <Box
            ref={popover}
            sx={{
              position: "absolute",
              top: "calc(100% + 15px)",
              left: 0,
              borderRadius: 1,
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 10,
            }}>
            <HexColorPicker color={color} onChange={setColor} onBlur={handleColorBlur} />
          </Box>
        )}

        <TextField
          variant="standard"
          name={name}
          value={color}
          helperText={helperText}
          onChange={(event) => setColor(event.target.value)}
          onBlur={handleColorBlur}
          slotProps={{
            input: {
              inputComponent: HexColorInputCustom,
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            },
          }}
        />
      </Stack>
    </div>
  );
}
