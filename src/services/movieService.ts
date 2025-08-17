import axios from 'axios';
import type { Movie } from "../types/movie";

export interface FetchMoviesResponse {
  results: Movie[];
    total_pages: number;
}

export const fetchMovies = async (
  page: number, 
  query: string
): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(`https://api.themoviedb.org/3/search/movie`, {
    params: {
        page: page,
        query: query,
        include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      
    },
  });
  return response.data;
}
