'use client';

import { FilterAlt } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';

import { useState } from 'react';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  return (
    <IconButton size="large" onClick={() => setActiveFilter((value) => !value)}>
      <Badge
        color="success"
        badgeContent=" "
        variant="dot"
        invisible={!activeFilter}
      >
        <FilterAlt fontSize="large" color="primary" />
      </Badge>
    </IconButton>
  );
}
