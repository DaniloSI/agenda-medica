/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Box, Grid, Typography } from '@mui/material';

import ProfessionalContext from '@/contexts/ProfessionalContext';
import { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDate, notify } from '@/utils';
import { LoadingButton } from '@mui/lab';
import InputMaskForm from '@/components/form/InputMaskForm';
import RadioGroupForm from '@/components/form/RadioGroupForm';
import SelectForm from '@/components/form/SelectForm';
import TextFieldForm from '@/components/form/TextFieldForm';
import ModalAppointmentTimes from '../ModalAppointmentTimes';

type BookingFormInputs = {
  date: Date;
  time: string;
  specialty: string;
  firstAppointment: 'yes' | 'no' | '';
  appointmentReason: string;
  phone: string;
};

const schema = object({
  specialty: string().required('Selecione uma especialidade'),
  firstAppointment: string<'yes' | 'no' | ''>().required(
    'Informação obrigatória'
  ),
  appointmentReason: string().required(
    'Por favor, digite o motivo da consulta.'
  ),
  phone: string()
    .required('Digite um número de telefone para contato')
    .length(11, 'Número de telefone incompleto'),
});

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = new Date(searchParams.get('date') as string);
  const time = searchParams.get('time') ?? '';
  const resolver = yupResolver(schema);
  const methods = useForm<BookingFormInputs>({ resolver });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { specialties } = useContext(ProfessionalContext);

  const formattedDate = formatDate(date, { dateStyle: 'long' });

  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    console.log(JSON.stringify({ ...data, date, time }, null, '\t'));
    setIsLoading(true);

    setTimeout(() => {
      notify('success', 'Consulta agendada com sucesso!');
      router.push('/booking');
    }, 1000);
  };

  if (Object.keys(errors).length) {
    console.log(errors);
  }

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        noValidate
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

          <Grid item container justifyContent="flex-end" mt={2}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Agendar consulta
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
