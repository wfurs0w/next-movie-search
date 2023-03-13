import { FaHeart, FaTv, FaUser } from 'react-icons/fa';
import { Button, Navbar, Nav, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Movie } from '../utils/types';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface HeaderProps {
  handleLogOut: () => void;
  favorites: Movie[];
}

const Header = ({ handleLogOut, favorites }: HeaderProps): JSX.Element => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const router = useRouter();

  let title = 'Next TV';

  if (router.pathname === '/search') {
    title = 'Search - Next TV';
  }

  useEffect(() => {
    const storedFavorites = localStorage?.getItem('favorites');
    if (storedFavorites) {
      setFavoriteMovies(JSON.parse(storedFavorites));
    }
  }, [favorites]);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleRemoveFavorite = (movie: Movie) => {
    const newFavoriteMovies = favoriteMovies.filter((fm) => fm.imdbID !== movie.imdbID);
    setFavoriteMovies(newFavoriteMovies);
    localStorage?.setItem('favorites', JSON.stringify(newFavoriteMovies));
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <div className="container">
            <Link href="/search" className="text-decoration-none">
              <Navbar.Brand>
                <FaTv size={20} /> <span>Next TV</span>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link onClick={handleShowFavorites}>
                  <FaHeart size={20} /> {favoriteMovies.length}
                </Nav.Link>
                <Nav.Link href="/search">
                  <FaUser size={20} />
                </Nav.Link>
                <Button variant="danger" onClick={handleLogOut}>
                  LogOut
                </Button>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        {showFavorites && (
          <ul className="list-group bg-dark">
            {favoriteMovies.map((movie) => (
              <li key={movie.imdbID} className="list-group-item item bg-dark">
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  className="img-fluid rounded"
                  style={{ height: '40px' }}
                />
                <a
                  className="text-decoration-none black"
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                >
                  {movie.Title}
                </a>
                <Button
                  variant="outline-danger"
                  className="ms-3 p-1"
                  onClick={() => handleRemoveFavorite(movie)}
                >
                  Remove
                </Button>
              <style jsx>{`
                .black {
                  color: white;
                  margin-left: 10px;
                }

                .black:hover {
                  color: red;
                }

                li:first-child {
                  border-radius: 0;
                }
              `}</style>
            </li>
          ))}
        </ul>
      )}
    </header>
    </>
  );
};

export default Header;



