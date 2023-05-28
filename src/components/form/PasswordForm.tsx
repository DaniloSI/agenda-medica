/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { get } from 'lodash';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function PasswordForm({
  name = 'password',
  label = 'Password',
  ...props
}: OutlinedInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

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
          <OutlinedInput
            id={name}
            label={label}
            required
            {...props}
            {...field}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
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
