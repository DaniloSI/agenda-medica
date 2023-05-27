'use client';

import Grid from '@mui/material/Grid';

import { boolean, object, array, ObjectSchema } from 'yup';
import TextFieldForm from '@/components/form/TextFieldForm';
import { Link, Typography } from '@mui/material';
import CheckboxForm from '@/components/form/CheckboxForm';

import { string } from '@/utils/yup.custom';
import SelectForm from '@/components/form/SelectForm';

import regulators from '@/mocks/regulators.json';
import AutocompleteForm from '@/components/form/AutocompleteForm';

import specialties from '@/utils/medical-specialties.json';
import Form from '@/components/form';
import CommonFields from '../CommonFields';

type ProfessionalRegister = {
  regulator: string;
  code: string;
  uf: string;
};

type RegisterInputs = {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  register: ProfessionalRegister;
  specialties: string[];
  acceptTerms: boolean;
};

const schema: ObjectSchema<RegisterInputs> = object({
  givenName: string().required(),
  familyName: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
  phone: string().phone().required(),
  register: object({
    regulator: string().required(),
    code: string().required(),
    uf: string().required(),
  }).required() as ObjectSchema<ProfessionalRegister>,
  specialties: array().required(),
  acceptTerms: boolean()
    .required()
    .isTrue('Aceite os termos de consentimento para continuar.'),
});

export default function RegisterProfessional() {
  return (
    <Form schema={schema}>
      <Grid container columnSpacing={2}>
        <CommonFields />

        <Grid item xs={12} md={4}>
          <SelectForm
            name="register.regulator"
            label="Órgão regulador"
            options={regulators.map((r) => ({ value: r, label: r }))}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextFieldForm
            name="register.code"
            label="Número de registro"
            inputMode="numeric"
            inputProps={{
              maxLength: '7',
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AutocompleteForm
            name="register.uf"
            label="UF"
            options={[
              { value: 'ES', label: 'Espírito Santo' },
              { value: 'RJ', label: 'Rio de Janeiro' },
              { value: 'SP', label: 'São Paulo' },
              { value: 'PE', label: 'Pernambuco' },
            ]}
            propDisplay="value"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <AutocompleteForm
            name="specialties"
            label="Especialidades"
            multiple
            options={specialties.map((s) => ({ value: s, label: s }))}
            required
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
    </Form>
  );
}
