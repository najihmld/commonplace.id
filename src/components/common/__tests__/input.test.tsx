import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from 'lucide-react';
import { Input, InputWithIcon } from '../input';

describe('Input', () => {
  it('renders input with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');

    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});

describe('InputWithIcon', () => {
  it('renders input with icon on the right by default', () => {
    render(<InputWithIcon Icon={Search} placeholder="Search" />);
    const input = screen.getByPlaceholderText('Search');
    const iconContainer = input.parentElement?.querySelector('div');

    expect(input).toBeInTheDocument();
    expect(iconContainer).toHaveClass('right-0');
  });

  it('renders input with icon on the left when specified', () => {
    render(
      <InputWithIcon Icon={Search} iconPosition="left" placeholder="Search" />,
    );
    const input = screen.getByPlaceholderText('Search');
    const iconContainer = input.parentElement?.querySelector('div');

    expect(input).toBeInTheDocument();
    expect(iconContainer).toHaveClass('left-0');
  });

  it('applies custom container className', () => {
    render(
      <InputWithIcon Icon={Search} containerClassName="custom-container" />,
    );
    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<InputWithIcon Icon={Search} placeholder="Search" />);
    const input = screen.getByPlaceholderText('Search');

    await user.type(input, 'Test search');
    expect(input).toHaveValue('Test search');
  });

  it('handles disabled state', () => {
    render(<InputWithIcon Icon={Search} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
