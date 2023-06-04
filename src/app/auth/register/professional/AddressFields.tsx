'use client';

import Grid from '@mui/material/Grid';

import TextFieldForm from '@/components/Form/TextFieldForm';

import InputMaskForm from '@/components/Form/InputMaskForm';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { notify } from '@/utils';
import { getZipCodeDetails } from '@/services/zip-code';
import AddressField from './AddressField';

export default function AddressFields() {
  const { control, setValue } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const zipCode = useWatch({
    control,
    name: 'address.zipCode',
  });

  useEffect(() => {
    if (zipCode?.length === 9) {
      setIsLoading(true);

      getZipCodeDetails(zipCode)
        .then(({ data }) => {
          const { erro } = data;

          if (erro) {
            notify('error', 'CEP não encontrado');
          } else {
            setValue('address.state', data.uf);
            setValue('address.city', data.localidade);
            setValue('address.neighborhood', data.bairro);
            setValue('address.streetAddress', data.logradouro);
          }
        })
        .catch(() => notify('error', 'Falha ao tentar buscar dados do CEP'))
        .finally(() => setIsLoading(false));
    } else {
      setValue('address.state', '');
      setValue('address.city', '');
      setValue('address.neighborhood', '');
      setValue('address.streetAddress', '');
    }
  }, [setValue, zipCode]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <InputMaskForm
          name="address.zipCode"
          label="CEP"
          format="zip-code"
          autoComplete="postal-code"
        />
      </Grid>

      <AddressField name="address.state" label="Estado" isLoading={isLoading} />

      <AddressField
        name="address.city"
        label="Município"
        isLoading={isLoading}
      />

      <AddressField
        name="address.neighborhood"
        label="Bairro"
        isLoading={isLoading}
      />

      <AddressField
        name="address.streetAddress"
        label="Rua ou Avenida"
        isLoading={isLoading}
      />

      <Grid item xs={12} md={6}>
        <TextFieldForm name="address.number" label="Número" />
      </Grid>
    </>
  );
}
