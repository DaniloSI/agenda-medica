'use client';

import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { AnyObjectSchema } from 'yup';
import { notify } from '@/utils';

type FormProps<T> = {
  schema: AnyObjectSchema;
  onSubmit: (data: T) => Promise<void>;
  submitButtonLabel?: string;
  children: React.ReactNode;
};

export default function Form<T extends FieldValues>({
  schema,
  onSubmit: handleOnSubmit,
  submitButtonLabel = 'Enviar',
  children,
}: FormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const resolver = yupResolver(schema);
  const methods = useForm<T>({ resolver });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<T> = async (data) => {
    setIsLoading(true);
    await handleOnSubmit(data);
    setIsLoading(false);
  };

  const onError = () => {
    notify('error', 'Por favor, revise o preenchimento do(s) campo(s).');
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(e) => void handleSubmit(onSubmit, onError)(e)}
        sx={{ mt: 1 }}
        noValidate
      >
        {children}

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          {submitButtonLabel}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
