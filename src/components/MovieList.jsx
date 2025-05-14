import React from 'react';

const MovieList = ({ movies, onSelect }) => {
  return (
    <ul className="list-group">
      {movies.map((movie, index) => (
        <li key={index} className="d-flex justify-content-between list-group-item list-group-item-action" onClick={() => onSelect(movie)}>
          <div className="small">EPISODE - {movie.episode_id}</div>
          <div className="fw-bold">EPISODE - {movie.episode_id}  {movie.title}</div>
          <div className="small">{movie.release_date}</div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
