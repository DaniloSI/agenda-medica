'use client';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TextFieldForm from '@/components/form/TextFieldForm';

type LoginInputs = {
  email: string;
  password: string;
};

const schema = object({
  email: string().required('Digite o seu e-mail'),
  password: string().required('Digite sua senha'),
});

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const resolver = yupResolver(schema);
  const methods = useForm<LoginInputs>({ resolver });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(JSON.stringify(data, null, '\t'));
    setIsLoading(true);

    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        sx={{ mt: 1 }}
        noValidate
      >
        <TextFieldForm name="email" label="E-mail" autoComplete="email" />

        <TextFieldForm
          name="password"
          label="Senha"
          autoComplete="current-password"
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Entrar
        </LoadingButton>

        <Grid container>
          <Grid item xs>
            <Link href="/" variant="body2">
              Esqueceu sua senha?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/register/patient" variant="body2">
              Não possui uma conta? Cadastrar
            </Link>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
