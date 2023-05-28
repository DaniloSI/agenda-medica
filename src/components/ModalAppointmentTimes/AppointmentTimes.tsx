'use client';

import Box from '@mui/material/Box';
import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import appointmentTimes from '@/mocks/appointmentTimes';
import { useKeenSlider } from 'keen-slider/react';
import { grey } from '@mui/material/colors';
import { formatDate } from '@/utils';
import { useContext, useState } from 'react';

import { useRouter } from 'next/navigation';
import ProfessionalContext from '@/contexts/ProfessionalContext';

type AppointmentTimesProps = {
  onChangeCallback?: () => void;
};

export default function AppointmentTimes({
  onChangeCallback,
}: AppointmentTimesProps) {
  const theme = useTheme();
  const { id } = useContext(ProfessionalContext);
  const router = useRouter();
  const { sm, md } = theme.breakpoints.values;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      [`(min-width: ${sm}px)`]: {
        slides: { perView: 4 },
      },
      [`(min-width: ${md}px)`]: {
        slides: { perView: 5 },
      },
    },
    slides: { perView: 3 },
  });

  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  const handleClickTime = (date: Date, time: string) => {
    const params = new URLSearchParams();

    params.append('date', date.toISOString());
    params.append('time', time);

    router.push(`/booking/${id}?${params.toString()}`);

    if (onChangeCallback) {
      onChangeCallback();
    }
  };

  return (
    <Box display="flex">
      <Box>
        <IconButton
          size="small"
          color={loaded && currentSlide > 0 ? 'primary' : 'default'}
          onClick={handlePrev}
        >
          <ArrowLeft fontSize="large" />
        </IconButton>
      </Box>
      <Box ref={sliderRef} className="keen-slider">
        {appointmentTimes.map((day) => (
          <Box key={day.date.toISOString()} className="keen-slider__slide">
            <Stack key={day.date.toISOString()} textAlign="center" spacing={1}>
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
                <Button
                  key={time}
                  onClick={() => handleClickTime(day.date, time)}
                >
                  {time}
                </Button>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
      <Box>
        <IconButton
          size="small"
          color={
            loaded &&
            instanceRef.current &&
            currentSlide < instanceRef.current.track.details.slides.length - 1
              ? 'primary'
              : 'default'
          }
          onClick={handleNext}
        >
          <ArrowRight fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
