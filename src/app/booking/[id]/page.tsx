'use client';

import { Container, Paper } from '@mui/material';

import Breadcrumbs from '@/components/Breadcrumbs';
import ProfessionalContext from '@/contexts/ProfessionalContext';
import professionals from '@/mocks/professionals.json';
import { useMemo } from 'react';
import { Professional } from '@/types';
import CardProfessional from '../CardProfessional';
import BookingForm from './BookingForm';

type BookingProps = {
  params: { id: string };
};

export default function Booking({ params: { id } }: BookingProps) {
  const professional = useMemo(
    () => ({
      ...professionals[parseInt(id, 10) - 1],
      id,
    }),
    [id]
  ) as Professional;

  return (
    <Container maxWidth="lg" component="main" sx={{ pb: 4 }}>
      <Breadcrumbs />

      <Container maxWidth="sm">
        <Paper variant="outlined">
          <ProfessionalContext.Provider value={professional}>
            <CardProfessional basic />
            <BookingForm />
          </ProfessionalContext.Provider>
        </Paper>
      </Container>
    </Container>
  );
}
