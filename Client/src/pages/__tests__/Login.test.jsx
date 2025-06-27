import { render, screen } from '@testing-library/react';
import Login from '../auth/Login';
 
test('renders login page', () => {
  render(<Login />);
  expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
}); 