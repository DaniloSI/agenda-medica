'use client';

import { Box, Typography } from '@mui/material';
import { MedicalServices as MedicalServicesIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      style={{
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <Box display="flex" alignItems="center">
        <MedicalServicesIcon sx={{ display: 'flex', mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 5,
            display: 'flex',
            flexGrow: { xs: 1, md: 0 },
            fontWeight: 700,
          }}
        >
          Agenda Médica
        </Typography>
      </Box>
    </Link>
  );
}
