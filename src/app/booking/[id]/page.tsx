'use client';

import { Container, Typography } from '@mui/material';

import Breadcrumbs from '@/components/Breadcrumbs';

export default function Booking() {
  return (
    <Container maxWidth="lg" component="main">
      <Breadcrumbs />

      <Typography>Agendar consulta médica</Typography>
    </Container>
  );
}
