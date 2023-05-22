'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { get } from 'lodash';

import { useFormContext } from 'react-hook-form';

export default function TextFieldForm({ name, ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name as string);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      {...props}
      {...register(name as string)}
      error={!!error}
      helperText={error?.message as string}
    />
  );
}
