'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', md: 800 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AppointmentTimes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button variant="outlined" fullWidth onClick={handleOpen}>Ver horários disponíveis</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Horários
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            Exibir horários aqui. Opções de implementação:
            <ul>
              <li>Em forma de carousel, usando o emotion (exmeplo doctoralia).</li>
              <li>Exibir calendário e horários ao selecionar um dia.</li>
            </ul>
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose}>Fechar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
