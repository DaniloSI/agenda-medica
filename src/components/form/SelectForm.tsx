/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';

import { ErrorMessage } from '@hookform/error-message';
import { get } from 'lodash';

type Option = {
  value: string;
  label: string;
};

type SelectFormProps = {
  name: string;
  label: string;
  selectProps?: SelectProps;
  formControlProps?: FormControlProps;
  options?: Option[];
};

export default function SelectForm({
  name,
  label,
  selectProps = {},
  formControlProps = {},
  options = [],
}: SelectFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      required
      fullWidth
      margin="normal"
      {...formControlProps}
      error={!!get(errors, name)}
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        native
        {...selectProps}
        labelId={name}
        label={label}
        {...register(name)}
      >
        <option value="" aria-label="Selecione uma opção" />
        {options.map(({ value, label: labelOption }) => (
          <option key={value} value={value}>
            {labelOption}
          </option>
        ))}
      </Select>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <FormHelperText>{message}</FormHelperText>}
      />
    </FormControl>
  );
}
