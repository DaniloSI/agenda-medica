'use client';

import {
  FilterAlt,
  NavigateNext,
  Place,
  Star,
} from '@mui/icons-material';
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import specialties from '@/utils/medical-specialties.json';
import states from '@/utils/states.json';
import { useState } from 'react';
import professionals from '@/mocks/professionals.json';
import ModalAppointmentTimes from './ModalAppointmentTimes';

export default function Booking() {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  return (
    <Container maxWidth="lg" component="main">
      <Breadcrumbs
        component={Box}
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        my={3}
      >
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/"
          onClick={() => {}}
        >
          Home
        </Link>
        <Typography key="3" color="text.primary">
          Agendamento de Consulta
        </Typography>
      </Breadcrumbs>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        spacing={2}
      >
        <Autocomplete
          disablePortal
          id="combo-box-specialties"
          options={specialties}
          fullWidth
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="Especialidade" />
          )}
        />

        <Autocomplete
          disablePortal
          id="combo-box-states"
          options={states}
          fullWidth
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Localidade" />}
        />
        <IconButton
          size="large"
          onClick={() => setActiveFilter((value) => !value)}
        >
          <Badge color="success" badgeContent=" " variant="dot" invisible={!activeFilter}>
            <FilterAlt fontSize="large" color="primary" />
          </Badge>
        </IconButton>
      </Stack>

      <Grid container mb={3} mt={{ xs: 0, md: 3 }} spacing={2} alignItems="stretch">
        {professionals.map((p, id) => ({ ...p, id })).map((professional) => (
          <Grid key={professional.id} item xs={12} md={6}>
            <Paper variant="outlined" component={Box} p={2} height="100%" display="flex" flexDirection="column" justifyContent="space-between">
              <Box>
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ width: 56, height: 56 }} />
                  <Stack spacing={1}>
                    <Typography variant="h6">{professional.name}</Typography>
                    <Typography variant="body2">
                      {professional.specialties.join(', ')}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Rating
                        name="rating"
                        value={professional.rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                      />
                      <Box ml={1}>{`${professional.ratingQuantity} opiniões`}</Box>
                    </Box>
                  </Stack>
                </Stack>
                <Stack direction="row" my={2} spacing={1}>
                  <Place fontSize="small" />
                  <Typography variant="body2">{`${professional.address.street}, Nº ${professional.address.number}`}</Typography>
                </Stack>
              </Box>
              <ModalAppointmentTimes />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
