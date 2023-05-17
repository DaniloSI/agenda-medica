'use client';

import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';

type AutocompleteProps = {
  id: string;
  label: string;
  options: string[];
};

export default function Autocomplete({
  id,
  label,
  options,
}: AutocompleteProps) {
  return (
    <MuiAutocomplete
      disablePortal
      id={`combo-box-${id}`}
      options={options}
      fullWidth
      renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...params} label={label} />
      )}
    />
  );
}
