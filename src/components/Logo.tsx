'use client';

import { Box, Typography } from '@mui/material';
import { MedicalServices as MedicalServicesIcon } from '@mui/icons-material';
import Link from 'next/link';
import { Variant } from '@mui/material/styles/createTypography';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
};

export default function Logo({ size = 'medium' }: LogoProps) {
  return (
    <Link
      href="/"
      style={{
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <Box display="flex" alignItems="center">
        <MedicalServicesIcon sx={{ display: 'flex', mr: 1 }} fontSize={size} />
        <Typography
          variant={
            {
              small: 'body1',
              medium: 'h6',
              large: 'h5',
            }[size] as Variant
          }
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
