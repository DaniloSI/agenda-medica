'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button, IconButton, Stack, Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import { grey } from '@mui/material/colors';
import usePageSize from '@/hooks/usePageSize';

const appointmentTimes = Array.from({ length: 23 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((day) => ({
  date: `2023-05-${day}T00:00`,
  times: Array.from({ length: 9 }, (_, i) => i + (i > 3 ? 9 : 8)).map((n) => n.toString().padStart(2, '0')).flatMap((hour) => [`${hour}:00`, `${hour}:30`]),
}))
  .map((day) => ({ ...day, date: new Date(day.date) }));

export default function AppointmentTimes() {
  const [page, setPage] = useState(1);
  const { numberItemsPage, totalPages } = usePageSize(appointmentTimes.length);

  useEffect(() => {
    if (page > totalPages) {
      setPage(Math.trunc(totalPages));
    }
  }, [totalPages, page]);

  const handlePrev = () => {
    setPage((p) => (p === 1 ? p : p - 1));
  };

  const handleNext = () => {
    setPage((p) => (p >= totalPages ? p : p + 1));
  };

  return (
    <Box display="flex">
      <Box>
        <IconButton
          size="small"
          color={page === 1 ? 'default' : 'primary'}
          onClick={handlePrev}
        >
          <ArrowLeft fontSize="large" />
        </IconButton>
      </Box>
      <Box sx={{
        minWidth: { xs: 'calc(100vw - 130px)', md: 'calc(800px - 130px)' },
        overflowX: 'hidden',
      }}
      >
        <Stack
          direction="row"
          sx={{
            transform: `translateX(calc(100% * -${page - 1}))`,
            transition: 'transform 1s',
          }}
        >
          {appointmentTimes.map((day) => (
            <Stack
              key={day.date.toISOString()}
              textAlign="center"
              spacing={1}
              sx={{
                minWidth: { xs: `calc((100vw - 130px) / ${numberItemsPage})`, md: `calc((800px - 130px) / ${numberItemsPage})` },
              }}
            >
              <Box>
                <Typography textTransform="capitalize">
                  {day.date.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '')}
                </Typography>
                <Typography textTransform="capitalize" variant="body2" color={grey[600]}>
                  {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(day.date).replaceAll(/( de|\.)/g, '')}
                </Typography>
              </Box>
              {day.times.map((time) => (
                <Button>{time}</Button>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box>
        <IconButton
          size="small"
          color={page >= totalPages ? 'default' : 'primary'}
          onClick={handleNext}
        >
          <ArrowRight fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
