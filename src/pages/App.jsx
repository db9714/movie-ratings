import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import MovieDetail from '../components/MovieDetail';
import Loader from '../components/Loader';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const API_URL = 'https://www.swapi.tech/api/films';
const OMDB_API_URL = "https://www.omdbapi.com/?t="
const OMDB_API_KEY = "b9a5e69d"

function App() {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [omdbInfo, setOmdbInfo] = useState(null);


  useEffect(() => {

    const fetchMovies = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();

      const details = await Promise.all(
        data.result.map(async (film) => {
          const filmRes = await fetch(film.properties.url);
          const filmData = await filmRes.json();
          return filmData.result.properties;
        })
      );
      setLoading(false)
      setMovies(details);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMoviesMoreInfo = async () => {
      if (!selectedMovie?.title) return;
      const res = await fetch(OMDB_API_URL + selectedMovie.title + '&apikey=' + OMDB_API_KEY);
      const data = await res.json();
      setOmdbInfo(data);
    };
    fetchMoviesMoreInfo();
  }, [selectedMovie]);


  const sortedMovies = [...movies]
    .filter(m => m.title.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'episode') return a.episode_id - b.episode_id;
      if (sortOrder === 'year') return new Date(a.release_date) - new Date(b.release_date);
      if (sortOrder === 'recent') return new Date(b.release_date) - new Date(a.release_date);
      return 0;
    });


  const handleClear = () => {
    setFilterText("");
    setSelectedMovie();
    setSortOrder("");
    setOmdbInfo(null);
  }

  return (
    <div className="container-fluid p-3">
      <div className="d-flex mb-3">
        <select onChange={(e) => setSortOrder(e.target.value)} className="form-control w-25" value={sortOrder}>
          <option value="">Sort by...</option>
          <option value="episode">Episode</option>
          <option value="year">Release Year</option>
          <option value="recent">Recently Released</option>
        </select>
        <input
          type="text"
          placeholder="Type to search..."
          className="form-control"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className='btn btn-primary ml-4' onClick={() => handleClear()}>Clear</button>
      </div>

      <div className="row" style={{ height: '100vh' }}>
        <div className="col-md-7 border-end">
          {!loading ?
            <MovieList movies={sortedMovies} onSelect={setSelectedMovie} />
            : <Loader/>}
        </div>
        <div className="col-md-5">
          <MovieDetail movie={selectedMovie} omdbInfo={omdbInfo} />
        </div>
      </div>
    </div>
  );
}

export default App;
