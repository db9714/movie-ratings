import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import MovieDetail from '../components/MovieDetail';

describe('MovieDetail component', () => {
  it('should render prompt when no movie is selected', () => {
    render(<MovieDetail movie={{}} omdbInfo={{}} />);
    expect(screen.getByText(/select a movie to see details/i)).toBeInTheDocument();
  });

  it('should display movie details when movie is provided', () => {
    const mockMovie = {
      episode_id: 4,
      title: 'A New Hope',
      opening_crawl: 'It is a period of civil war... ',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
    };

    const mockOmdbInfo = {
      Poster: 'https://image.url/poster.jpg',
      Title: 'A New Hope',
      Genre: 'Action, Adventure, Fantasy',
      Ratings: [
        { Source: 'Internet Movie Database', Value: '8.6/10' },
        { Source: 'Rotten Tomatoes', Value: '93%' },
      ],
    };

    render(<MovieDetail movie={mockMovie} omdbInfo={mockOmdbInfo} />);

    expect(screen.getByText(/EPISODE - 4 - A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByText(/Directed by:/i)).toBeInTheDocument();
    expect(screen.getByText(/Produced by:/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/i)).toBeInTheDocument();
    expect(screen.getByText('Internet Movie Database - 8.6/10')).toBeInTheDocument();
    expect(screen.getByText('Rotten Tomatoes - 93%')).toBeInTheDocument();
    const image = screen.getByAltText(/A New Hope Poster/i);
    expect(image).toHaveAttribute('src', mockOmdbInfo.Poster);
  });

  it('should display message if ratings are not available', () => {
    const mockMovie = {
      episode_id: 5,
      title: 'The Empire Strikes Back',
      opening_crawl: 'It is a dark time for the Rebellion...',
    };

    const mockOmdbInfo = {
      Ratings: [],
    };

    render(<MovieDetail movie={mockMovie} omdbInfo={mockOmdbInfo} />);
    expect(screen.getByText(/Ratings not available/i)).toBeInTheDocument();
  });
});
