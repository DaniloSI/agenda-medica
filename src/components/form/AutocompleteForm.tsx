'use client';

import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { get } from 'lodash';

type Option = {
  value: string;
  name: string;
};

type AutocompleteProps = {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
};

export default function AutocompleteForm({
  name,
  label,
  options,
  required = false,
}: AutocompleteProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <MuiAutocomplete
          disablePortal
          options={options}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
          }
          fullWidth
          noOptionsText="Nenhuma opção encontrada"
          isOptionEqualToValue={(opt, value) => opt.value === value}
          {...field}
          onChange={(_, value) => {
            field.onChange(value?.value);
          }}
          renderInput={(params) => (
            <TextField
              margin="normal"
              {...params}
              label={label}
              required={required}
              error={!!get(errors, name)}
              helperText={get(errors, name)?.message as string}
            />
          )}
        />
      )}
    />
  );
}
