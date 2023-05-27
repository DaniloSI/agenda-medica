'use client';

import Grid from '@mui/material/Grid';

import InputMaskForm from '@/components/Form/InputMaskForm';
import TextFieldForm from '@/components/Form/TextFieldForm';

export default function CommonFields() {
  return (
    <>
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
          name="phone"
          label="Telefone"
          format="phone"
          type="phone"
          autoComplete="phone"
          inputMode="numeric"
        />
      </Grid>
    </>
  );
}
