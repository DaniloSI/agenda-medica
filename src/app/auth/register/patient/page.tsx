'use client';

import Grid from '@mui/material/Grid';

import { ObjectSchema, boolean, object } from 'yup';
import InputMaskForm from '@/components/Form/InputMaskForm';
import RadioGroupForm from '@/components/Form/RadioGroupForm';
import { Link, Typography } from '@mui/material';
import CheckboxForm from '@/components/Form/CheckboxForm';

import { date, string } from '@/utils/yup.custom';
import Form from '@/components/Form';
import { useRouter } from 'next/navigation';

import { notify } from '@/utils';
import CommonFields from '../CommonFields';

type Gender = 'm' | 'f' | 'o';

type RegisterInputs = {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  acceptTerms: boolean;
};

const schema: ObjectSchema<RegisterInputs> = object({
  givenName: string().required(),
  familyName: string().required(),
  email: string().email().required(),
  password: string().required(),
  phone: string().phone().required(),
  birthDate: date()
    .fromString()
    .required()
    .typeError('Digite a data de nascimento'),
  gender: string<Gender>().required(),
  acceptTerms: boolean()
    .required()
    .isTrue('Aceite os termos de consentimento para continuar.'),
});

export default function RegisterPatient() {
  const router = useRouter();
  return (
    <Form
      schema={schema}
      submitButtonLabel="Criar conta"
      onSubmit={async (data) => {
        console.log(JSON.stringify(data, null, '\t'));
        return new Promise((resolve) => {
          setTimeout(() => {
            notify('success', 'Conta criada com sucesso!');
            router.push('/auth/login');
            resolve();
          }, 5000);
        });
      }}
    >
      <Grid container columnSpacing={2}>
        <CommonFields />

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
    </Form>
  );
}
