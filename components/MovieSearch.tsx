import { useState } from 'react';
import axios from 'axios';
import { MovieCard } from './MovieCard';
import { Paginator } from './Paginator';
import { Movie } from '../utils/types';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = '6a9097c1';

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${currentPage}`
      );
      const searchResults = response.data.Search || [];
      const filteredResults = searchResults.filter((movie: any) => {
      const movieTitle = movie.Title.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return movieTitle === searchTermLower || movieTitle.includes(searchTermLower);
      });
      
      setMovies(filteredResults);
      setTotalPages(Math.ceil(parseInt(response.data.totalResults) / 10));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    searchMovies();
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
    searchMovies();
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    searchMovies();
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearchSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button className="btn btn-dark" type="submit">
            Search
          </button>
        </div>
      </form>

      {movies && movies.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {movies.map((movie: Movie) => (
            <div key={movie.imdbID} className="col">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No movies found</p>
      )}

      {movies.length > 0 && (
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          setCurrentPage={setCurrentPage}
          searchMovies={searchMovies}
        />
      )}
    </div>
  );
};

export default MovieSearch;
