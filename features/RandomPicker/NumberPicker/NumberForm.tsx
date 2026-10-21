import { Grid, Stack } from "@mui/material";

import ActionGroup from "@/ActionGroup";

import NumberOptions from "@/features/RandomPicker/NumberPicker/NumberOptions";
import NumberRange from "@/features/RandomPicker/NumberPicker/NumberRange";
import Output from "@/features/RandomPicker/NumberPicker/Output";
import Presets from "@/features/RandomPicker/NumberPicker/Presets";
import { type NumberPickerValues } from "@/features/RandomPicker/NumberPicker/constants";

import OutputMessage from "@/components/common/OutputMessage";

interface NumberFormProps {
  resultRef: React.RefObject<HTMLDivElement | null>;
  values: NumberPickerValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClick: () => void;
  handleCopy: () => void;
  handleReset: () => void;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

const NumberForm = ({
  resultRef,
  values,
  handleChange,
  handleClick,
  handleCopy,
  handleReset,
  handleDecrease,
  handleIncrease,
}: NumberFormProps) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <NumberOptions
            values={values}
            handleChange={handleChange}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />

          <Presets values={values} handleChange={handleChange} />

          <NumberRange values={values} handleChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={5}>
          <ActionGroup
            isCopyDisabled={!values?.randomNumber?.length}
            generateAria="generate random numbers"
            handleClick={handleClick}
            handleCopy={handleCopy}
            handleReset={handleReset}
          />

          <Stack
            ref={resultRef}
            flexDirection="row"
            justifyContent={values.resultIsCentered ? "center" : "flex-start"}
            flexWrap="wrap"
            gap={2}
            mt={5}
            mb={2}>
            {values.randomNumber.length > 0 ? (
              <>
                {values.randomNumber.map((number, index) => (
                  <Output key={index} number={number} isLottery={values.isLottery} />
                ))}
                {values?.lotteryPower && (
                  <Output
                    number={values.lotteryPower}
                    isLottery={values.isLottery}
                    isLotteryPower={true}
                  />
                )}
              </>
            ) : (
              <OutputMessage message="No numbers to show." />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default NumberForm;
