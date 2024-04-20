import { render, screen } from '@testing-library/react';
import Watermarko from './Watermarko';

test('renders learn react link', () => {
  render(<Watermarko />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
