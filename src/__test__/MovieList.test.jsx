import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../components/MovieList';
import { describe, it, expect, vi } from 'vitest';

describe('MovieList Component', () => {
  const mockMovies = [
    {
      episode_id: 1,
      title: 'The Phantom Menace',
      release_date: '1999-05-19'
    },
    {
      episode_id: 2,
      title: 'Attack of the Clones',
      release_date: '2002-05-16'
    }
  ];

  it('renders a list of movies correctly', () => {
    const mockSelect = vi.fn();
    render(<MovieList movies={mockMovies} onSelect={mockSelect} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(mockMovies.length);
    expect(screen.getByText(/EPISODE - 1\s+The Phantom Menace/)).toBeInTheDocument();
    expect(screen.getByText(/1999-05-19/)).toBeInTheDocument();
  });

  it('calls onSelect when a movie item is clicked', () => {
    const mockSelect = vi.fn();
    render(<MovieList movies={mockMovies} onSelect={mockSelect} />);

    const listItems = screen.getAllByRole('listitem');
    fireEvent.click(listItems[0]);

    expect(mockSelect).toHaveBeenCalledTimes(1);
    expect(mockSelect).toHaveBeenCalledWith(mockMovies[0]);
  });

  it('handles empty movies array gracefully', () => {
    const mockSelect = vi.fn();
    render(<MovieList movies={[]} onSelect={mockSelect} />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('ensures all elements per list item are rendered', () => {
    const mockSelect = vi.fn();
    render(<MovieList movies={mockMovies} onSelect={mockSelect} />);

    const episodeLabels = screen.getAllByText(/EPISODE - \d+/);
    const titles = screen.getAllByText(/EPISODE - \d+\s+.+/);

    expect(episodeLabels.length).toBeGreaterThan(0);
    expect(titles.length).toBeGreaterThan(0);
  });
});
