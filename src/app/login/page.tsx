'use client';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Logo from '@/components/Logo';

import { blue } from '@mui/material/colors';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Copyright from './Copyright';

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(JSON.stringify(data, null, '\t'));
    setIsLoading(true);

    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box color={blue[700]} mb={4}>
          <Logo size="large" />
        </Box>
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(onSubmit)(e);
          }}
          sx={{ mt: 1 }}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
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
              <Link href="/register" variant="body2">
                Não possui uma conta? Cadastrar
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
