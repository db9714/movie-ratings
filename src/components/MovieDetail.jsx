import React from 'react';

const MovieDetail = ({ movie,omdbInfo }) => {
  if (!movie || Object.keys(movie).length === 0) {
    return <div>Select a movie to see details.</div>;
  }  console.log(movie,"movie",omdbInfo)
  return (
    <div>
      <h5>EPISODE - {movie.episode_id} - {movie.title}</h5>

      {omdbInfo?.Poster && (
        <img
          src={omdbInfo.Poster}
          alt={`${omdbInfo.Title} Poster`}
          style={{ width: '200px', marginBottom: '1rem', borderRadius: '8px' }}
        />
      )}


      <p><strong>Description:</strong> <br /> {movie.opening_crawl || 'No description available.'}</p>
      {movie?.director && <p><strong>Directed by:</strong> {movie?.director}</p>}
      {movie?.producer && <p><strong>Produced by:</strong> {movie?.producer}</p>}
      {omdbInfo?.Genre && <p><strong>Genre:</strong> {omdbInfo?.Genre}</p>}
      <strong>Ratings:</strong>
      {omdbInfo?.Ratings.length > 0 ?  omdbInfo?.Ratings.map((rating)=>{
        return (<div>{rating.Source} - {rating.Value}</div>)
      }) : " Ratings not available"}
    </div>
  );
}

export default MovieDetail;
