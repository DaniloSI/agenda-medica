import './globals.css';
import { Inter } from 'next/font/google';
import AppBar from './AppBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Agenda Médica',
  description: 'Sistema para agendamento de consultas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ maxHeight: '100vh' }}>
        <AppBar />
        {children}
      </body>
    </html>
  );
}
