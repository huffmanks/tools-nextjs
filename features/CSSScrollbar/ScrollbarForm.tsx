import { Box, Grid, Stack, Typography } from "@mui/material";

import {
  type InitialColors,
  scrollbarThumbPickers,
  scrollbarTrackPickers,
} from "@/constants/popoverColorPicker";

import Demo from "@/features/CSSScrollbar/Demo";
import PixelInput from "@/features/CSSScrollbar/PixelInput";
import ScrollbarRadios from "@/features/CSSScrollbar/ScrollbarRadios";
import ScrollbarSelect from "@/features/CSSScrollbar/ScrollbarSelect";
import type { InitialCssScrollbarValues } from "@/features/CSSScrollbar/types";

import PopoverColorPicker from "@/components/common/PopoverColorPicker";

interface ScrollbarFormProps {
  values: InitialCssScrollbarValues;
  colors: InitialColors;
  handleBlur: (name: string, color: string) => void;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: unknown } }
  ) => void;
}

const ScrollbarForm = ({ values, colors, handleBlur, handleChange }: ScrollbarFormProps) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 5 }}>
        <Demo values={values} colors={colors} />
        <Typography variant="subtitle1" sx={{}}>
          Scrollbar Styles
        </Typography>
        <Stack direction={{ xs: "column", lg: "row" }} sx={{ columnGap: 4, rowGap: 1 }}>
          <ScrollbarRadios
            radioGroup="directionRadios"
            groupLabel="Direction"
            ariaLabel="direction-radios-label"
            groupName="axis"
            defaultValue="y"
            groupValue={values.axis}
            handleChange={handleChange}
          />
          <ScrollbarRadios
            radioGroup="trackTransparentRadios"
            groupLabel="Track transparent?"
            ariaLabel="track-transparent-radios-label"
            groupName="isTrackTransparent"
            defaultValue={true}
            groupValue={values.isTrackTransparent}
            handleChange={handleChange}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 4, marginBlockStart: 2 }}>
          <ScrollbarSelect
            selectGroup="firefoxWidthSelect"
            groupLabel="Firefox width"
            ariaLabel="firefoe-width-select-label"
            groupName="widthFirefox"
            defaultValue="auto"
            groupValue={values.widthFirefox}
            handleChange={handleChange}
          />

          <PixelInput
            inputLabel="Thickness"
            inputName="thickness"
            inputValue={values.thickness}
            handleChange={handleChange}
          />
        </Stack>

        {!values.isTrackTransparent && (
          <Stack
            direction={{ xs: "column", sm: "row", md: "column", lg: "row" }}

            sx={{
              gap: 4,
              marginBlockStart: 4,
              alignItems: { xs: "start", sm: "center", md: "start", lg: "center" },
            }}>
            <Box sx={{ display: "grid", alignItems: "end", gap: 3 }}>
              {scrollbarTrackPickers.map((picker) => (
                <PopoverColorPicker
                  key={picker.name}
                  label={picker?.label}
                  name={picker.name}
                  helperText={picker?.helperText}
                  handleBlur={handleBlur}
                />
              ))}
            </Box>
            4
            <Stack sx={{ gap: 3, paddingBlockStart: { xs: 0, sm: 5, md: 0, lg: 5 } }}>
              <PixelInput
                inputLabel="Border radius"
                inputName="trackRadius"
                inputValue={values.trackRadius}
                handleChange={handleChange}
              />
              <PixelInput
                inputLabel="Border width"
                inputName="trackBorderWidth"
                inputValue={values.trackBorderWidth}
                handleChange={handleChange}
              />
            </Stack>
          </Stack>
        )}

        <Stack
          direction={{ xs: "column", sm: "row", md: "column", lg: "row" }}
          sx={{
            gap: 4,
            marginBlockStart: 4,
            alignItems: { xs: "start", sm: "center", md: "start", lg: "center" },
          }}>
          <Box sx={{ display: "grid", alignItems: "end", gap: 3 }}>
            {values.isTrackTransparent
              ? scrollbarThumbPickers
                  .filter((_picker, index) => index !== 1)
                  .map((picker) => (
                    <PopoverColorPicker
                      key={picker.name}
                      label={picker?.label}
                      name={picker.name}
                      helperText={picker?.helperText}
                      handleBlur={handleBlur}
                    />
                  ))
              : scrollbarThumbPickers.map((picker) => (
                  <PopoverColorPicker
                    key={picker.name}
                    label={picker?.label}
                    name={picker.name}
                    helperText={picker?.helperText}
                    handleBlur={handleBlur}
                  />
                ))}
          </Box>

          <Stack sx={{ gap: 3, paddingBlockStart: { xs: 0, sm: 5, md: 0, lg: 5 } }}>
            <PixelInput
              inputLabel="Border radius"
              inputName="thumbRadius"
              inputValue={values.thumbRadius}
              handleChange={handleChange}
            />
            {!values.isTrackTransparent && (
              <>
                <PixelInput
                  inputLabel="Border width"
                  inputName="thumbBorderWidth"
                  inputValue={values.thumbBorderWidth}
                  handleChange={handleChange}
                />
              </>
            )}
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default ScrollbarForm;
