import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

/**
 * Example test file to show Vitest setup
 * You can use this as a template for writing tests
 */

// Example component for testing
function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick}>{children}</button>;
}

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);

    const button = getByRole('button');
    button.click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is accessible', () => {
    const { getByRole } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });
});

describe('Testing Setup', () => {
  it('should work with basic assertions', () => {
    const sum = 1 + 2;
    expect(sum).toBe(3);
  });

  it('should work with async tests', async () => {
    const promise = Promise.resolve(42);
    await expect(promise).resolves.toBe(42);
  });

  it('should work with mocks', () => {
    const mockFn = vi.fn();
    mockFn('test');

    expect(mockFn).toHaveBeenCalledWith('test');
  });
});
