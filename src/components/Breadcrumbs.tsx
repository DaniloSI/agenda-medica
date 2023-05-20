'use client';

import { NavigateNext } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = [
    { label: 'Home', link: '/', pattern: /^\//g },
    { label: 'Buscar médicos', link: '/booking', pattern: /^\/booking/g },
    { label: 'Agendamento', link: '/booking', pattern: /^\/booking\/\d.*/g },
  ].filter((p) => p.pattern.test(pathname));

  return (
    <MuiBreadcrumbs
      component={Box}
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      my={3}
    >
      {paths.map((b, index) =>
        index < paths.length - 1 ? (
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href={b.link}
            onClick={() => {}}
          >
            {b.label}
          </Link>
        ) : (
          <Typography key="3" color="text.primary">
            {b.label}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
}
