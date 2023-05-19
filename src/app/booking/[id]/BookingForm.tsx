'use client';

import { Box } from '@mui/material';

import ProfessionalContext from '@/contexts/ProfessionalContext';
import { useContext } from 'react';
import Autocomplete from '../Autocomplete';

export default function BookingForm() {
  const { specialties } = useContext(ProfessionalContext);

  return (
    <Box p={2}>
      <Autocomplete
        id="specialties"
        label="Especialidade"
        options={specialties}
        required
      />
    </Box>
  );
}
