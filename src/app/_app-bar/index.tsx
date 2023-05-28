'use client';

import * as React from 'react';
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Link,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';
import MenuAccount from './MenuAccount';

export default function AppBar() {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return !/^\/auth\/.*/g.test(pathname) ? (
    <MuiAppBar position="relative">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                href="/booking"
              >
                <Typography textAlign="center">Agendar Consulta</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Logo />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 5 }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              href="/booking"
            >
              Agendar Consulta
            </Button>
          </Box>

          <MenuAccount />
        </Toolbar>
      </Container>
    </MuiAppBar>
  ) : null;
}
