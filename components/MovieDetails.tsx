import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../utils/types';
import { Button, Image } from 'react-bootstrap';

interface MovieDetailProps {
  handleAddToFavorites: (movie: Movie) => void;
}

const MovieDetail = ({ handleAddToFavorites }: MovieDetailProps) => {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const API_KEY = '6a9097c1';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${router.query.id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [router.query.id]);

  const handleAddToFavoritesClick = () => {
    if (movie) {
      handleAddToFavorites(movie);
      addToFavoritesList(movie);
    }
  };

  const addToFavoritesList = (movie: Movie) => {
    const favorites = getFavoritesList();
    if (favorites) {
      const isMovieAlreadyAdded = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);
      if (!isMovieAlreadyAdded) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    } else {
      localStorage.setItem('favorites', JSON.stringify([movie]));
    }
  };
  

  const getFavoritesList = (): Movie[] | null => {
    const favorites = localStorage.getItem('favorites');
    if (typeof favorites === 'string') {
      try {
        return JSON.parse(favorites) as Movie[];
      } catch (error) {
        console.error('Error parsing favorites list:', error);
      }
    }
    return null;
  };
  

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <Image 
            src={movie.Poster} 
            alt={movie.Title} 
            className="img-fluid rounded" 
          />
        </div>
        <div className="col-md-8">
          <h1>{movie.Title}</h1>
          <p>{movie.Year}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p>
            <strong>Rating:</strong> {movie.Actors}
          </p>
          <Button className="btn btn-dark" onClick={handleAddToFavoritesClick}>
            Add to favorites
          </Button>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark ms-2"
          >
            View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

