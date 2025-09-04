import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create parlay link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Crear Parley/i);
  expect(linkElement).toBeInTheDocument();
});
