import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroList from '../components/HeroList';
import { getHeroes } from '../api/api';
import { useRouter } from 'next/router';

// Mock the getHeroes function
jest.mock('../api/api', () => ({
  getHeroes: jest.fn(),
}));

// Mock the useRouter hook from next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('HeroList Component', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders hero items correctly', async () => {
    // Mock the API response
    (getHeroes as jest.Mock).mockResolvedValue({
      results: [
        { name: 'Hero 1', url: 'http://example.com/hero/1/' },
        { name: 'Hero 2', url: 'http://example.com/hero/2/' },
      ],
    });

    render(<HeroList />);

    // Wait for heroes to be displayed
    await waitFor(() => {
      expect(screen.getByText('Hero 1')).toBeInTheDocument();
      expect(screen.getByText('Hero 2')).toBeInTheDocument();
    });
  });

  it('handles load more button click', async () => {
    (getHeroes as jest.Mock).mockResolvedValue({
      results: [
        { name: 'Hero 1', url: 'http://example.com/hero/1/' },
      ],
    });

    render(<HeroList />);

    // Wait for initial heroes to be loaded
    await waitFor(() => {
      expect(screen.getByText('Hero 1')).toBeInTheDocument();
    });

    // Mock the API response for the next page
    (getHeroes as jest.Mock).mockResolvedValue({
      results: [
        { name: 'Hero 2', url: 'http://example.com/hero/2/' },
      ],
    });

    // Click the Load More button
    fireEvent.click(screen.getByText('Load More'));

    // Wait for the new heroes to be loaded
    await waitFor(() => {
      expect(screen.getByText('Hero 2')).toBeInTheDocument();
    });
  });

  it('navigates to hero details on hero click', async () => {
    (getHeroes as jest.Mock).mockResolvedValue({
      results: [
        { name: 'Hero 1', url: 'http://example.com/hero/1/' },
      ],
    });

    render(<HeroList />);

    // Wait for hero to be displayed
    await waitFor(() => {
      expect(screen.getByText('Hero 1')).toBeInTheDocument();
    });

    // Click the hero item
    fireEvent.click(screen.getByText('Hero 1'));

    // Check if router push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/hero/1');
  });
});
