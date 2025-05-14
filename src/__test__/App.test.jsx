// App.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import React from 'react';
import App from '../pages/App';

vi.mock('../components/MovieList', () => ({
  default: ({ movies, onSelect }) => (
    <div>
      {movies.map((movie) => (
        <div key={movie.title} onClick={() => onSelect(movie)}>{movie.title}</div>
      ))}
    </div>
  )
}));

vi.mock('../components/MovieDetail', () => ({
  default: ({ movie, omdbInfo }) => (
    <div data-testid="movie-detail">
      {movie?.title && <h1>{movie.title}</h1>}
      {omdbInfo && <img src={omdbInfo.Poster} alt="poster" />}
    </div>
  )
}));

vi.mock('../components/Loader', () => ({
  default: () => <div>Loading...</div>
}));

global.fetch = vi.fn();

const mockSwapiResponse = {
  result: [
    {
      properties: {
        title: 'A New Hope',
        episode_id: 4,
        release_date: '1977-05-25',
        opening_crawl: 'It is a period of civil war...',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        url: 'https://www.swapi.tech/api/films/1'
      }
    }
  ]
};

const mockFilmDetailResponse = {
  result: {
    properties: mockSwapiResponse.result[0].properties
  }
};

const mockOmdbResponse = {
  Title: 'A New Hope',
  Poster: 'http://example.com/poster.jpg'
};

describe('App component', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test('renders loader and then movie list', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockSwapiResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockFilmDetailResponse) });

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
    });
  });

  test('filters movie by input text', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockSwapiResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockFilmDetailResponse) });

    render(<App />);
    await screen.findByText('A New Hope');

    fireEvent.change(screen.getByPlaceholderText(/type to search/i), {
      target: { value: 'hope' }
    });

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
  });

  test('clicking a movie loads details and OMDB info', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockSwapiResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockFilmDetailResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockOmdbResponse) });

    render(<App />);
    await screen.findByText('A New Hope');
    fireEvent.click(screen.getByText('A New Hope'));

    await waitFor(() => {
      expect(screen.getByTestId('movie-detail')).toBeInTheDocument();
    });
  });

  test('clear button resets state', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockSwapiResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockFilmDetailResponse) });

    render(<App />);
    await screen.findByText('A New Hope');

    fireEvent.change(screen.getByPlaceholderText(/type to search/i), {
      target: { value: 'hope' }
    });
    fireEvent.click(screen.getByText('Clear'));

    expect(screen.getByPlaceholderText(/type to search/i).value).toBe('');
  });
});
