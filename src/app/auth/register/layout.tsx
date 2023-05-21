'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState(pathname.split('/').at(-1));

  const handleChange = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    setUserType(value);
    router.replace(
      {
        patient: '/auth/register/patient',
        professional: '/auth/register/professional',
      }[value] ?? ''
    );
  };

  return (
    <>
      <RadioGroup
        row
        aria-labelledby="type"
        onChange={handleChange}
        value={userType}
      >
        <FormControlLabel
          value="patient"
          control={<Radio />}
          label="Paciente"
        />
        <FormControlLabel
          value="professional"
          control={<Radio />}
          label="Profissional"
        />
      </RadioGroup>
      {children}
      <Stack>
        <Link href="/auth/login" variant="body2">
          Já possui uma conta? Entrar
        </Link>
      </Stack>
    </>
  );
}
