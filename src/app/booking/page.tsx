'use client';

import { Container, Grid, Stack } from '@mui/material';

import specialties from '@/utils/medical-specialties.json';
import states from '@/utils/states.json';
import professionals from '@/mocks/professionals.json';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardProfessional from './CardProfessional';
import Filter from './Filter';
import Autocomplete from './Autocomplete';

export default function Booking() {
  return (
    <Container maxWidth="lg" component="main">
      <Breadcrumbs />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        spacing={2}
      >
        <Autocomplete
          id="specialties"
          options={specialties}
          label="Especialidade"
        />

        <Autocomplete id="states" options={states} label="Localidade" />

        <Filter />
      </Stack>

      <Grid
        container
        mb={3}
        mt={{ xs: 0, md: 3 }}
        spacing={2}
        alignItems="stretch"
      >
        {professionals
          .map((p, id) => ({ ...p, id }))
          .map((professional) => (
            <Grid key={professional.id} item xs={12} md={6}>
              <CardProfessional professional={professional} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
