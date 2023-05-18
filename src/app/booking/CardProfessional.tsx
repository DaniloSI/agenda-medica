'use client';

import { Place, Star } from '@mui/icons-material';
import { Avatar, Box, Paper, Rating, Stack, Typography } from '@mui/material';

import { useContext } from 'react';
import ProfessionalContext from '@/contexts/ProfessionalContext';
import ModalAppointmentTimes from './ModalAppointmentTimes';

export default function CardProfessional() {
  const { name, specialties, rating, ratingQuantity, address } =
    useContext(ProfessionalContext);

  return (
    <Paper
      variant="outlined"
      component={Box}
      p={2}
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: 56, height: 56 }} />
          <Stack spacing={1}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">{specialties.join(', ')}</Typography>
            <Box display="flex" alignItems="center">
              <Rating
                name="rating"
                value={rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box ml={1}>{`${ratingQuantity} opiniões`}</Box>
            </Box>
          </Stack>
        </Stack>
        <Stack direction="row" my={2} spacing={1}>
          <Place fontSize="small" />
          <Typography variant="body2">{`${address.street}, Nº ${address.number}`}</Typography>
        </Stack>
      </Box>
      <ModalAppointmentTimes />
    </Paper>
  );
}
