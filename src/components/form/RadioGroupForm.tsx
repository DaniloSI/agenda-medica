/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';

import { ErrorMessage } from '@hookform/error-message';

type RadioGroupFormProps = {
  name: string;
  label: string;
  defaultValue?: string;
  options?: Partial<FormControlLabelProps>[];
  formControlProps?: FormControlProps;
  radioGroupProps?: RadioGroupProps;
};

export default function RadioGroupForm({
  name,
  label,
  defaultValue = '',
  options = [],
  formControlProps = {},
  radioGroupProps = {},
}: RadioGroupFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl
      error={!!errors[name]}
      required
      margin="normal"
      {...formControlProps}
    >
      <FormLabel id={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            row
            {...radioGroupProps}
            {...field}
            aria-labelledby={name}
            onChange={(_, value) => field.onChange(value)}
            value={field.value}
          >
            {options.map(({ value, label: optionLabel }) => (
              <FormControlLabel
                key={value as string}
                value={value}
                control={<Radio />}
                label={optionLabel}
              />
            ))}
          </RadioGroup>
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <FormHelperText>{message}</FormHelperText>}
      />
    </FormControl>
  );
}
