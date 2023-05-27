/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { Grid, Typography } from '@mui/material';

import ProfessionalContext from '@/contexts/ProfessionalContext';
import { useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ObjectSchema, object } from 'yup';
import { formatDate, notify } from '@/utils';
import InputMaskForm from '@/components/Form/InputMaskForm';
import RadioGroupForm from '@/components/Form/RadioGroupForm';
import SelectForm from '@/components/Form/SelectForm';
import TextFieldForm from '@/components/Form/TextFieldForm';
import { string } from '@/utils/yup.custom';
import ModalAppointmentTimes from '@/components/ModalAppointmentTimes';
import Form from '@/components/Form';

type FirstAppointment = 'yes' | 'no' | '';

type BookingFormInputs = {
  specialty: string;
  firstAppointment: FirstAppointment;
  appointmentReason: string;
  phone: string;
};

const schema: ObjectSchema<BookingFormInputs> = object({
  specialty: string().required('Selecione uma especialidade'),
  firstAppointment: string<FirstAppointment>().required(
    'Informação obrigatória'
  ),
  appointmentReason: string().required(
    'Por favor, digite o motivo da consulta.'
  ),
  phone: string()
    .phone()
    .required('Digite um número de telefone para contato')
    .length(11, 'Número de telefone incompleto'),
});

export default function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const date = new Date(searchParams.get('date') as string);
  const time = searchParams.get('time') ?? '';
  const { specialties } = useContext(ProfessionalContext);

  const formattedDate = formatDate(date, { dateStyle: 'long' });

  return (
    <Form
      schema={schema}
      submitButtonLabel="Agendar consulta"
      onSubmit={async (data) => {
        console.log(JSON.stringify({ ...data, date, time }, null, '\t'));
        return new Promise((resolve) => {
          setTimeout(() => {
            notify('success', 'Consulta agendada com sucesso!');
            router.push('/booking');
            resolve();
          }, 5000);
        });
      }}
    >
      <Grid container p={2}>
        <Grid item xs={12}>
          <SelectForm
            name="specialty"
            label="Especialidade"
            options={specialties.map((s) => ({ value: s, label: s }))}
          />
        </Grid>

        <Grid item xs={12} mt={2} mb={1}>
          <Typography>Data e Horário:</Typography>
          <Typography
            sx={{ fontWeight: 700 }}
          >{`${formattedDate} às ${time}`}</Typography>

          <ModalAppointmentTimes mode="edit" />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupForm
            name="firstAppointment"
            label="Primeira consulta?"
            options={[
              { value: 'yes', label: 'Sim' },
              { value: 'no', label: 'Não' },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputMaskForm
            name="phone"
            label="Telefone"
            autoComplete="phone"
            format="phone"
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldForm
            name="appointmentReason"
            label="Motivo da consulta"
            placeholder="Escreva o motivo da consulta."
            multiline
            rows={5}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
