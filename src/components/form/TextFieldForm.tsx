'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';

export default function TextFieldForm({ name, ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      {...props}
      {...register(name as string)}
      error={!!errors[name as string]}
      helperText={errors[name as string]?.message as string}
    />
  );
}
