import './globals.css';
import { Inter } from 'next/font/google';
import AppBar from './AppBar';
import LoadConfig from './LoadConfig';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Agenda Médica',
  description: 'Sistema para agendamento de consultas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ paddingBottom: 32 }}>
        <AppBar />
        {children}
        <LoadConfig />
      </body>
    </html>
  );
}
