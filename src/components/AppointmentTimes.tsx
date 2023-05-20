'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import { grey } from '@mui/material/colors';
import usePageSize from '@/hooks/usePageSize';
import appointmentTimes from '@/mocks/appointmentTimes';
import { formatDate } from '@/utils';

type AppointmentTimesProps = {
  onClickTime: (date: Date, time: string) => void;
};

export default function AppointmentTimes({
  onClickTime,
}: AppointmentTimesProps) {
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
      <Box
        sx={{
          minWidth: { xs: 'calc(100vw - 162px)', md: 'calc(800px - 162px)' },
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
                minWidth: {
                  xs: `calc((100vw - 162px) / ${numberItemsPage})`,
                  md: `calc((800px - 162px) / ${numberItemsPage})`,
                },
              }}
            >
              <Box>
                <Typography textTransform="capitalize">
                  {day.date
                    .toLocaleString('pt-BR', { weekday: 'short' })
                    .replace('.', '')}
                </Typography>
                <Typography
                  textTransform="capitalize"
                  variant="body2"
                  color={grey[600]}
                >
                  {formatDate(day.date, {
                    day: 'numeric',
                    month: 'short',
                  }).replaceAll(/( de|\.)/g, '')}
                </Typography>
              </Box>
              {day.times.map((time) => (
                <Button key={time} onClick={() => onClickTime(day.date, time)}>
                  {time}
                </Button>
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
