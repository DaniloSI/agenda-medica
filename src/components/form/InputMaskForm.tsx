/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { get } from 'lodash';
import GenericInputMask, { GenericInputMaskProps } from '../GenericInputMask';

export default function InputMaskForm({
  name,
  label,
  ...props
}: GenericInputMaskProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      margin="normal"
      error={!!get(errors, name as string)}
      fullWidth
      variant="outlined"
    >
      <InputLabel htmlFor={name} variant="outlined">
        {label}
      </InputLabel>
      <Controller
        name={name as string}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <GenericInputMask
            id={name}
            required
            {...props}
            {...field}
            label={label}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name as string}
        render={({ message }) => <FormHelperText>{message}</FormHelperText>}
      />
    </FormControl>
  );
}
