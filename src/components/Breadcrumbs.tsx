'use client';

import {
  NavigateNext,
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from '@mui/material';

export default function Breadcrumbs() {
  return (
    <MuiBreadcrumbs
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
    </MuiBreadcrumbs>
  );
}
