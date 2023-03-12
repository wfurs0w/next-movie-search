export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  Director: string;
  Genre: string;
  Runtime: string;
  Actors: string;
  Writer: string;
  Released: string;

}

export type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchMovies: () => Promise<void>; // Add searchMovies to the type
};

export interface UserState {
  user: {
    id?: string;
    name: string;
    email?: string;
    avatar?: string;
  } | null;
  isLoggedIn: boolean;
}

