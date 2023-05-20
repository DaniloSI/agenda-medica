/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormControlLabel,
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
import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import InputMask from '@/components/InputMask';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ModalAppointmentTimes from '../ModalAppointmentTimes';

type BookingFormInputs = {
  specialty: string;
  firstAppointment: 'yes' | 'no' | '';
  appointmentReason: string;
  phone: string;
};

const schema = object({
  specialty: string().required(),
  firstAppointment: string<'yes' | 'no' | ''>().required(),
  appointmentReason: string().required(),
  phone: string().required(),
});

export default function BookingForm() {
  const resolver = yupResolver(schema);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormInputs>({ resolver });
  const searchParams = useSearchParams();
  const { specialties } = useContext(ProfessionalContext);

  const date = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(
    new Date(searchParams.get('date') as string)
  );
  const time = searchParams.get('time');

  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    console.log(JSON.stringify(data, null, '\t'));
  };

  if (Object.keys(errors).length) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container p={2} rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="specialty">Especialidade</InputLabel>
            <Select
              labelId="specialty"
              label="Especialidade"
              native
              {...register('specialty', { required: true })}
            >
              <option value="" aria-label="Selecione uma especialidade" />
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Data e Horário:</Typography>
          <Typography
            sx={{ fontWeight: 700 }}
          >{`${date} às ${time}`}</Typography>

          <ModalAppointmentTimes mode="edit" />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="first-appointment">Primeira consulta?</FormLabel>
            <Controller
              name="firstAppointment"
              control={control}
              rules={{ required: true }}
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
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <InputMask {...field} fullWidth label="Telefone" format="phone" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="appointment-reason"
            {...register('appointmentReason', { required: true })}
            label="Motivo da consulta"
            multiline
            rows={5}
            placeholder="Escreva o motivo da consulta."
            fullWidth
            focused
          />
        </Grid>

        <Grid item container justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Agendar consulta
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
