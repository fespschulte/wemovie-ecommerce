import { useState, useEffect } from "react";
import type { Movie } from "@/types/movie";
import { movieService } from "../services/movieService";

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook para gerenciar estado dos filmes
 */
export const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getMovies();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
