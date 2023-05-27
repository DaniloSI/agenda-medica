'use client';

import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { notify } from '@/utils';
import { AnyObjectSchema } from 'yup';

type FormProps = {
  schema: AnyObjectSchema;
  children: React.ReactNode;
};

export default function Form<T extends FieldValues>({
  schema,
  children,
}: FormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const resolver = yupResolver(schema);
  const methods = useForm<T>({ resolver });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<T> = (data) => {
    console.log(JSON.stringify(data, null, '\t'));
    setIsLoading(true);

    setTimeout(() => {
      notify('success', 'Conta criada com sucesso!');
      router.push('/auth/login');
      setIsLoading(false);
    }, 5000);
  };

  if (Object.keys(errors).length > 0) {
    console.log({ errors });
  }

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
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
          Criar conta
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
