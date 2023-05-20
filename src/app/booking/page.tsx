'use client';

import { Container, Grid } from '@mui/material';

import specialties from '@/utils/medical-specialties.json';
import states from '@/utils/states.json';
import professionals from '@/mocks/professionals.json';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProfessionalContext from '@/contexts/ProfessionalContext';
import CardProfessional from './CardProfessional';
import Filter from './Filter';
import Autocomplete from './Autocomplete';

export default function Booking() {
  return (
    <Container maxWidth="lg" component="main">
      <Breadcrumbs />

      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="specialties"
            options={specialties}
            label="Especialidade"
          />
        </Grid>

        <Grid item xs>
          <Autocomplete id="states" options={states} label="Localidade" />
        </Grid>

        <Grid item>
          <Filter />
        </Grid>
      </Grid>

      <Grid
        container
        mb={3}
        mt={{ xs: 0, md: 3 }}
        spacing={2}
        alignItems="stretch"
      >
        {professionals
          .map((p, index) => ({ ...p, id: (index + 1).toString() }))
          .map((professional) => (
            <Grid key={professional.id} item xs={12} md={6}>
              <ProfessionalContext.Provider value={professional}>
                <CardProfessional />
              </ProfessionalContext.Provider>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
