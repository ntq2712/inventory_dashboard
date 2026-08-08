import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleSummary from './VehicleSummary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

vi.mock('../apis/vehicles', () => ({
  vehiclesApi: {
    getSummary: vi.fn(() =>
      Promise.resolve({
        data: {
          status: 200,
          success: true,
          data: {
            total: 42,
            new: 8,
            aging: 13,
          },
        },
      }),
    ),
  },
}));

describe('VehicleSummary', () => {
  it('renders total, new, and aging vehicle cards from API summary', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <VehicleSummary />
      </QueryClientProvider>,
    );

    expect(await screen.findByText('42')).toBeDefined();
    expect(await screen.findByText('8')).toBeDefined();
    expect(await screen.findByText('13')).toBeDefined();

    expect(screen.getByText(/Total Vehicles/i)).toBeTruthy();
    expect(screen.getByText(/New Vehicles/i)).toBeTruthy();
    expect(screen.getByText(/Aging Vehicles/i)).toBeTruthy();
  });
});
