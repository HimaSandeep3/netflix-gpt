import { useRef } from 'react';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // or use Heroicons/any

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -500,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 500,
      behavior: 'smooth',
    });
  };

  return (
    <div className="px-6 relative group">
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold">{title}</h1>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="hidden group-hover:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-60 p-2 rounded-full text-white"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide no-scrollbar"
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="hidden group-hover:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-60 p-2 rounded-full text-white"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default MovieList;
