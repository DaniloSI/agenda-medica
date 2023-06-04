'use client';

import Grid from '@mui/material/Grid';

import TextFieldForm from '@/components/Form/TextFieldForm';

import { useFormContext, useWatch } from 'react-hook-form';
import { CircularProgress } from '@mui/material';

type AddressFieldProps = {
  name: string;
  label: string;
  isLoading?: boolean;
};

export default function AddressField({
  name,
  label,
  isLoading = false,
}: AddressFieldProps) {
  const { control } = useFormContext();
  const field = useWatch({
    control,
    name,
  });

  return (
    <Grid item xs={12} md={6}>
      <TextFieldForm
        name={name}
        label={label}
        disabled
        InputLabelProps={{
          shrink: field?.length > 0,
        }}
        InputProps={{
          endAdornment: isLoading && (
            <CircularProgress size={26} color="inherit" sx={{ mr: 1 }} />
          ),
        }}
      />
    </Grid>
  );
}
