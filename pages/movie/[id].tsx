import { Movie } from '../../utils/types';
import Header from '@/components/Header';
import MovieDetail from '@/components/MovieDetails';
import { useState } from 'react';
import router from 'next/router';

const MovieDetailPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const handleLogOut = (): void => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleAddToFavorites = (movie: Movie): void => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  return (
    <>
      <Header handleLogOut={handleLogOut} favorites={[]} />
      <MovieDetail handleAddToFavorites={handleAddToFavorites} />
    </>
  );
};

export default MovieDetailPage;
