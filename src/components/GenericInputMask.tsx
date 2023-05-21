import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const patternFormatCustom = (mask: string) =>
  forwardRef<HTMLElement, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        onChange={() => {}}
        onAccept={(value: any) => {
          onChange({
            target: {
              name: props.name,
              value,
            },
          });
        }}
        mask={mask}
        overwrite
      />
    );
  });

type InputFormat = 'phone' | 'cpf' | 'date';

const inputPatterns = new Map([
  ['phone', patternFormatCustom('+55 (00) 0 0000-0000')],
  ['cpf', patternFormatCustom('000.000.000-00')],
  ['date', patternFormatCustom('00/00/0000')],
]);

export type GenericInputMaskProps = {
  format: InputFormat;
} & OutlinedInputProps;

const GenericInputMask = forwardRef(
  (
    { format, value, onChange, inputMode, ...props }: GenericInputMaskProps,
    ref
  ) => (
    <OutlinedInput
      {...props}
      inputRef={ref}
      value={value}
      onChange={onChange}
      inputProps={{
        inputMode,
      }}
      inputComponent={inputPatterns.get(format) as any}
    />
  )
);

export default GenericInputMask;
