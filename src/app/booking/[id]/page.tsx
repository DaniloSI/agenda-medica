'use client';

import { Container, Paper } from '@mui/material';

import Breadcrumbs from '@/components/Breadcrumbs';
import ProfessionalContext from '@/contexts/ProfessionalContext';
import professionals from '@/mocks/professionals.json';
import { Professional } from '@/types';
import CardProfessional from '../CardProfessional';
import BookingForm from './BookingForm';

type BookingProps = {
  params: { id: string };
};

export default function Booking({ params: { id } }: BookingProps) {
  const professional = professionals[parseInt(id, 10) - 1] as Professional;

  return (
    <Container maxWidth="lg" component="main">
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
