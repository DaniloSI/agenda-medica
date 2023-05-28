/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

import { Link } from '@mui/material';
import AppointmentTimes from './AppointmentTimes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', md: 800 },
  bgcolor: 'background.paper',
  maxHeight: '100vh',
  minHeight: '70vh',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

type ModalAppointmentTimesProps = {
  mode: 'create' | 'edit';
};

export default function ModalAppointmentTimes({
  mode,
}: ModalAppointmentTimesProps) {
  const [open, setOpen] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      {mode === 'create' ? (
        <Button variant="outlined" fullWidth onClick={handleOpen}>
          Ver horários disponíveis
        </Button>
      ) : (
        <Link
          component="button"
          variant="body2"
          type="button"
          onClick={handleOpen}
        >
          Alterar data e/ou horário
        </Link>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Horários"
        aria-describedby="Visualização de horários disponíveis"
        disableScrollLock
      >
        <Box sx={style}>
          <Box
            sx={{
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                boxShadow: 'inset 0 0 5px white',
                width: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#80808070',
                borderRadius: 16,
              },
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="center"
                mb={1}
              >
                Horários
              </Typography>
              <Box
                mb={2}
                style={{
                  height: viewMore ? undefined : 400,
                  overflowY: 'hidden',
                }}
              >
                <AppointmentTimes onChangeCallback={handleClose} />
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  endIcon={viewMore ? <ArrowUpward /> : <ArrowDownward />}
                  onClick={() => setViewMore((v) => !v)}
                >
                  {`Ver ${viewMore ? 'menos' : 'mais'}`}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose}>Fechar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
