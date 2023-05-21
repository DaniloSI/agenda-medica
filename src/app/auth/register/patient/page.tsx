'use client';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { boolean, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputMaskForm from '@/components/form/InputMaskForm';
import TextFieldForm from '@/components/form/TextFieldForm';
import RadioGroupForm from '@/components/form/RadioGroupForm';
import { Link, Typography } from '@mui/material';
import CheckboxForm from '@/components/form/CheckboxForm';

import { date } from '@/utils/yup.custom';
import { notify } from '@/utils';

type Gender = 'm' | 'f' | 'o';

type RegisterInputs = {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  acceptTerms: boolean;
};

const schema = object({
  givenName: string().required(),
  familyName: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
  phone: string().required(),
  birthDate: date()
    .fromString()
    .required()
    .typeError('Digite a data de nascimento'),
  gender: string<Gender>().required(),
  acceptTerms: boolean().isTrue(
    'Aceite os termos de consentimento para continuar.'
  ),
});

export default function RegisterPatient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const resolver = yupResolver(schema);
  const methods = useForm<RegisterInputs>({ resolver });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
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
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <TextFieldForm
              name="givenName"
              label="Nome"
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextFieldForm
              name="familyName"
              label="Sobrenome"
              autoComplete="family-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldForm
              name="email"
              label="E-mail"
              type="email"
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldForm
              name="password"
              label="Senha"
              type="password"
              autoComplete="new-password"
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldForm
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              autoComplete="new-password"
            />
          </Grid>

          <Grid item xs={12}>
            <InputMaskForm
              name="birthDate"
              label="Data de Nascimento"
              autoComplete="bday"
              format="date"
              inputMode="numeric"
            />
          </Grid>

          <Grid item xs={12}>
            <InputMaskForm
              name="phone"
              label="Telefone"
              format="phone"
              type="phone"
              autoComplete="phone"
              inputMode="numeric"
            />
          </Grid>

          <Grid item xs={12}>
            <RadioGroupForm
              name="gender"
              label="Sexo"
              options={[
                { value: 'm', label: 'Masculino' },
                { value: 'f', label: 'Feminino' },
                { value: 'o', label: 'Prefiro não responder' },
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <CheckboxForm
              name="acceptTerms"
              checkboxLabel={
                <Typography>
                  Li e concordo com os <Link href="/">Termos de Uso</Link> e{' '}
                  <Link href="/">Política de Privacidade</Link>.
                </Typography>
              }
            />
          </Grid>
        </Grid>

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
