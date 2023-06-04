'use client';

import {
  AutocompleteChangeReason,
  Autocomplete as MuiAutocomplete,
  TextField,
} from '@mui/material';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import { get } from 'lodash';
import { useState } from 'react';

type OptionProps = 'value' | 'label';

type Option = {
  value: string;
  label: string;
};

type AutocompleteFormProps = {
  name: string;
  label: string;
  options: Option[] | string[];
  required?: boolean;
  multiple?: boolean;
  propDisplay?: OptionProps;
};

export default function AutocompleteForm({
  name,
  label,
  options,
  required = false,
  multiple = false,
  propDisplay = 'label',
}: AutocompleteFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { append, remove } = useFieldArray({
    control,
    name,
  });
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const handleIsOptionEqualToValue = (
    option: Option | string,
    value: Option | string
  ) => (typeof option === 'string' ? option : option?.value) === value;

  const getInputValue = (value: Option) => {
    if (!value) {
      return '';
    }

    return typeof value === 'string' ? value : value[propDisplay];
  };

  const handleChange = (
    field: ControllerRenderProps<FieldValues, string>,
    value: any,
    reason: AutocompleteChangeReason
  ) => {
    if (multiple) {
      if (reason === 'selectOption') {
        append(value.at(-1).label);
      } else if (reason === 'removeOption') {
        const removed = field.value.filter(
          (v: string) => !value.includes(v)
        )[0];
        const removedIndex = field.value.findIndex(
          (v: string) => v === removed
        );

        remove(removedIndex);
      } else if (reason === 'clear') {
        remove();
      }
    } else {
      field.onChange(typeof value === 'string' ? value : value?.value);
      setInputValue(getInputValue(value));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      render={({ field }) => (
        <MuiAutocomplete
          disableCloseOnSelect={multiple}
          disablePortal
          options={options}
          fullWidth
          noOptionsText="Nenhuma opção encontrada"
          multiple={multiple}
          getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.label)}
          {...field}
          isOptionEqualToValue={handleIsOptionEqualToValue}
          onChange={(_, value, reason) => handleChange(field, value, reason)}
          inputValue={inputValue}
          onInputChange={(_, newInputValue, reason) => {
            if (reason === 'input' || multiple) {
              setInputValue(newInputValue);
            }
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
