import { PatternFormat, PatternFormatProps } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const patternFormatCustom = (mask: string) =>
  forwardRef<PatternFormatProps, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
        format={mask}
      />
    );
  });

type InputFormat = 'phone' | 'cpf';

const inputPatterns = new Map([
  ['phone', patternFormatCustom('+55 (##) # #### ####')],
  ['cpf', patternFormatCustom('###.###.###-##')],
]);

type InputMaskProps = {
  format: InputFormat;
};

export default function InputMask({
  format,
  value,
  onChange,
  ...props
}: InputMaskProps & TextFieldProps) {
  return (
    <TextField
      {...props}
      InputProps={{
        value,
        onChange,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputComponent: inputPatterns.get(format) as any,
      }}
      variant="outlined"
    />
  );
}
