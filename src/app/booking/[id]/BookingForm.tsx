/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import ProfessionalContext from '@/contexts/ProfessionalContext';
import { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputMask from '@/components/InputMask';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { formatDate, notify } from '@/utils';
import { LoadingButton } from '@mui/lab';
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormInputs>({ resolver });
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
    <Box
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <Grid container p={2} rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl required fullWidth error={!!errors.specialty}>
            <InputLabel id="specialty">Especialidade</InputLabel>
            <Select
              labelId="specialty"
              label="Especialidade"
              native
              {...register('specialty')}
            >
              <option value="" aria-label="Selecione uma especialidade" />
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <ErrorMessage
              errors={errors}
              name="specialty"
              render={({ message }) => (
                <FormHelperText>{message}</FormHelperText>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Data e Horário:</Typography>
          <Typography
            sx={{ fontWeight: 700 }}
          >{`${formattedDate} às ${time}`}</Typography>

          <ModalAppointmentTimes mode="edit" />
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.firstAppointment} required>
            <FormLabel id="first-appointment">Primeira consulta?</FormLabel>
            <Controller
              name="firstAppointment"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-labelledby="first-appointment"
                  onChange={(_, value) => field.onChange(value)}
                  value={field.value}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="firstAppointment"
              render={({ message }) => (
                <FormHelperText>{message}</FormHelperText>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => {
              const error = errors[field.name];
              return (
                <InputMask
                  {...field}
                  required
                  fullWidth
                  label="Telefone"
                  format="phone"
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            label="Motivo da consulta"
            multiline
            rows={5}
            placeholder="Escreva o motivo da consulta."
            fullWidth
            {...register('appointmentReason')}
            error={!!errors.appointmentReason}
            helperText={errors.appointmentReason?.message}
          />
        </Grid>

        <Grid item container justifyContent="flex-end">
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Agendar consulta
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
