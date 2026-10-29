import { HexColorInput } from "react-colorful";

interface HexColorInputCustomProps {
  value?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  placeholder?: string;
}

export default function HexColorInputCustom({
  value,
  onChange,
  ...props
}: HexColorInputCustomProps) {
  return (
    <HexColorInput
      {...props}
      color={value ?? ""}
      onChange={(newColor) => {
        onChange?.({
          target: { value: newColor, name: props.name ?? "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
    />
  );
}
