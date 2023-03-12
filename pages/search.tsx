import Header from '@/components/Header';
import MovieSearch from '@/components/MovieSearch';
import { useRouter } from 'next/router';

const SearchPage = (): JSX.Element => {
  const router = useRouter();

  const handleLogOut = (): void => {
    router.push('/login');
    localStorage.clear();
  };

  return (
    <div style={{ background: "linear-gradient(45deg, #e6f2ff, #ffffff)" }}>
      <Header handleLogOut={handleLogOut} favorites={[]} />
      <MovieSearch />
    </div>
  );
};

export default SearchPage;
