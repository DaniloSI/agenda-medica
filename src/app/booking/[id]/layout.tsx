'use client';

import { Container, Paper } from '@mui/material';

import Breadcrumbs from '@/components/Breadcrumbs';
import ProfessionalContext from '@/contexts/ProfessionalContext';
import professionals from '@/mocks/professionals.json';
import { useMemo } from 'react';
import { Professional } from '@/types';
import useScreen from '@/hooks/useScreen';
import CardProfessional from '../CardProfessional';

type BookingProps = {
  params: { id: string };
  children: React.ReactNode;
};

export default function BookingLayout({
  params: { id },
  children,
}: BookingProps) {
  const { isMobile } = useScreen();
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

      <Container maxWidth={isMobile ? 'lg' : 'sm'}>
        <Paper variant={isMobile ? 'elevation' : 'outlined'} elevation={0}>
          <ProfessionalContext.Provider value={professional}>
            <CardProfessional basic />
            {children}
          </ProfessionalContext.Provider>
        </Paper>
      </Container>
    </Container>
  );
}
