/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ReactElement } from 'react';
import { get } from 'lodash';

type CheckboxFormProps = {
  name: string;
  label?: string;
  checkboxLabel: ReactElement;
  formControlProps?: FormControlProps;
  formControlLabelProps?: Partial<FormControlLabelProps>;
  checkboxProps?: CheckboxProps;
};

export default function CheckboxForm({
  name,
  label,
  checkboxLabel,
  formControlProps = {},
  formControlLabelProps = {},
  checkboxProps = {},
}: CheckboxFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      error={!!get(errors, name)}
      required
      margin="normal"
      {...formControlProps}
    >
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            {...formControlLabelProps}
            label={checkboxLabel}
            control={
              <Checkbox
                {...checkboxProps}
                {...field}
                onChange={(_, value) => field.onChange(value)}
                checked={field.value}
              />
            }
          />
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
