'use client';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

type RegisterInputs = {
  givenName: string;
  email: string;
  password: string;
};

const schema = object({
  email: string().required('Digite o seu e-mail'),
  password: string().required('Digite sua senha'),
});

export default function RegisterProfessional() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const resolver = yupResolver(schema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log(JSON.stringify(data, null, '\t'));
    setIsLoading(true);

    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
      noValidate
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            autoComplete="givenName"
            autoFocus
            {...register('givenName')}
            error={!!errors.givenName}
            helperText={errors.givenName?.message}
          />
        </Grid>
      </Grid>

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
    </Box>
  );
}
