'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Button, IconButton, Stack, Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import { grey } from '@mui/material/colors';

export default function AppointmentTimes() {
  return (
    <Box display="flex">
      <Box mr={2}>
        <IconButton size="small">
          <ArrowLeft color="primary" fontSize="large" />
        </IconButton>
      </Box>
      <Stack direction="row" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
        {Array.from({ length: 15 }, (x, i) => i + 14).map((day) => ({
          date: `2023-05-${day}`,
          times: Array.from({ length: 9 }, (_, i) => i + (i > 3 ? 9 : 8)).map((n) => n.toString().padStart(2, '0')).flatMap((hour) => [`${hour}:00`, `${hour}:30`]),
        }))
          .map((day) => ({ ...day, date: new Date(day.date) }))
          .map((day) => (
            <Stack mx={2} textAlign="center" spacing={1}>
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
      <Box ml={2}>
        <IconButton size="small">
          <ArrowRight color="primary" fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
