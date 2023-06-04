'use client';

import Grid from '@mui/material/Grid';

import axios from 'axios';

import { boolean, object, array, ObjectSchema } from 'yup';
import TextFieldForm from '@/components/Form/TextFieldForm';
import { Link, Typography } from '@mui/material';
import CheckboxForm from '@/components/Form/CheckboxForm';

import { string } from '@/utils/yup.custom';
import SelectForm from '@/components/Form/SelectForm';

import regulators from '@/mocks/regulators.json';
import AutocompleteForm from '@/components/Form/AutocompleteForm';

import specialties from '@/utils/medical-specialties.json';
import Form from '@/components/Form';
import { notify } from '@/utils';
import { useRouter } from 'next/navigation';
import CommonFields from '../CommonFields';
import AddressFields from './AddressFields';

type ProfessionalRegister = {
  regulator: string;
  code: string;
  uf: string;
};

interface Address {
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  number: string;
  zipCode: string;
}

type RegisterInputs = {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  phone: string;
  register: ProfessionalRegister;
  specialties: string[];
  address: Address;
  acceptTerms: boolean;
};

const schema: ObjectSchema<RegisterInputs> = object({
  givenName: string().required(),
  familyName: string().required(),
  email: string().email().required(),
  password: string().required(),
  phone: string().phone().required(),
  register: object({
    regulator: string().required(),
    code: string().required(),
    uf: string().typeError('Campo obrigatório').required(),
  }).required() as ObjectSchema<ProfessionalRegister>,
  specialties: array()
    .required()
    .min(1, 'Selecione ao menos uma especialidade'),
  address: object({
    state: string().typeError('Campo obrigatório').required(),
    city: string().required(),
    neighborhood: string().required(),
    streetAddress: string().required(),
    number: string().required(),
    zipCode: string().required(),
  }).required() as ObjectSchema<Address>,
  acceptTerms: boolean()
    .required()
    .isTrue('Aceite os termos de consentimento para continuar.'),
});

export default function RegisterProfessional() {
  const router = useRouter();

  return (
    <Form
      schema={schema}
      submitButtonLabel="Criar conta"
      onSubmit={async (body) => {
        await axios
          .post('/api/professional/register', body)
          .then(() => {
            notify('success', 'Conta criada com sucesso!');
            router.push('/login');
          })
          .catch(({ response: { data } }) => {
            if (typeof data === 'string') {
              notify('error', data);
            } else {
              console.log(data);
            }
          });
      }}
    >
      <Grid container columnSpacing={2}>
        <CommonFields />

        <Grid item xs={12} mt={2}>
          <Typography variant="h6">Dados Profissionais</Typography>
        </Grid>

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

        <Grid item xs={12} mt={2}>
          <Typography variant="h6">Endereço de Atendimento</Typography>
        </Grid>

        <AddressFields />

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
