import { Movie } from '../utils/types';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="col">
      <Link href={`/movie/${movie.imdbID}`} className="text-decoration-none">
        <div>
          <div className="card h-100 border-0">
            <Image 
              src={movie.Poster} 
              className="card-img-top" 
              alt={movie.Title} 
              style={{ height: "420px" }} 
            />
            <div className="card-body" style={{ height: "100px" }}>
              <h5 className="card-title black">{movie.Title}</h5>
              <p className="card-text black">{movie.Year}</p>
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .card:hover {
          cursor: pointer;
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .card:hover .card-img-top {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .card-img-top {
          transition: transform 0.3s ease;
        }

        .black {
          color: black;
        }

        .card-title:hover,
        .card-text:hover {
          color: white;
          text-shadow: 1px 1px 2px black;
        }

        .card-img-top:hover {
          filter: brightness(70%);
        }

        @media (max-width: 575px) {
          .card {
            margin-bottom: 1.5rem;
            width: 75%;
            margin: 0 auto;
          }
          .card-img-top {
            height: 200px;
          }
          .card-body {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};


