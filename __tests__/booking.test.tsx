import { render, screen } from '@testing-library/react';
import Booking from '@/app/booking/page';

import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/booking'),
}));

describe('Booking', () => {
  it('should show the breadcrumb', () => {
    render(<Booking />);

    const breadcrumb = screen.getByText(/Buscar médicos/i);

    expect(breadcrumb).toBeInTheDocument();
  });

  it('should show appointment times modal when click in show available times', async () => {
    render(<Booking />);

    const showTimesButton = screen.getAllByRole('button', {
      name: /ver horários disponíveis/i,
    })[0];

    await userEvent.click(showTimesButton);

    const modalTitle = screen.getByRole('heading', {
      name: 'Horários',
    });

    expect(modalTitle).toBeVisible();
  });
});
