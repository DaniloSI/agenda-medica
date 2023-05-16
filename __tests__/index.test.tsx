import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('should render home page paragraph', () => {
    render(<Home />);

    const heading = screen.getByText(/home page/i);

    expect(heading).toBeInTheDocument();
  });
});
