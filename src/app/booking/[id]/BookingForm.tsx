/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

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
import ModalAppointmentTimes from '../ModalAppointmentTimes';

export default function BookingForm() {
  const searchParams = useSearchParams();
  const { specialties } = useContext(ProfessionalContext);
  const date = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(
    new Date(searchParams.get('date') as string)
  );
  const time = searchParams.get('time');

  return (
    <Grid container p={2} rowSpacing={4}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="specialty">Especialidade</InputLabel>
          <Select labelId="specialty" label="Especialidade" native>
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
        <Typography sx={{ fontWeight: 700 }}>{`${date} às ${time}`}</Typography>

        <ModalAppointmentTimes mode="edit" />
      </Grid>

      <Grid item xs={12}>
        <FormControl>
          <FormLabel id="first-appointment">Primeira consulta?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="first-appointment"
            name="first-appointment"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Sim" />
            <FormControlLabel value="no" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <InputMask fullWidth label="Telefone" name="phone" format="phone" />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="appointment-reason"
          label="Motivo da consulta"
          multiline
          rows={5}
          placeholder="Escreva o motivo da consulta."
          fullWidth
          focused
        />
      </Grid>

      <Grid item container justifyContent="flex-end">
        <Button variant="contained"> Agendar consulta</Button>
      </Grid>
    </Grid>
  );
}
