'use client';

import { Logout, Settings } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MenuAccount() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (link: string) => {
    handleClose();
    router.push(link);
  };

  const { photo } = {
    photo:
      'https://images.unsplash.com/photo-1573496799515-eebbb63814f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
  };

  return (
    <Box sx={{ flexGrow: 0, ml: 7 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={photo} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClick('/profile')}>
          <Avatar alt="Remy Sharp" src={photo} sx={{ width: 24, height: 24 }} />
          <Typography textAlign="center" ml={2}>
            Perfil
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClick('/my-account')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Minha conta
        </MenuItem>
        <MenuItem onClick={() => handleClick('/auth/logout')}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
}
