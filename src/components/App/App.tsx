import { useState } from 'react'
import css from './App.module.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import SearchBar from '../SearchBar/SearchBar'
import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as Error | null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const openModal = (movie: Movie) => {
  setSelectedMovie(movie);
};
  const closeModal = () => setSelectedMovie(null);
  const handleSearch = async (query: string) => {
    try
    {
      setError(null); 
      setMovies([]); 
      setLoading(true);
      const movies = await fetchMovies(1, query)      
        if (movies.length === 0) {
          toast.error('No movies found for your request.');
        } else {
          setMovies(movies);
        }
    }
    catch (error) {
      setError(error as Error);
      console.error('Error fetching movies:', error);
      toast.error('Failed to fetch movies. Please try again later.');
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch}/>
      {loading && <Loader/>}
      {error && <ErrorMessage/>}
      <MovieGrid onSelect={openModal} movies={movies}/>
      {selectedMovie && (
      <MovieModal movie={selectedMovie} onClose={closeModal}/>
)}
    <Toaster position="top-center" />
    </div>
  )
}