import type { Movie } from "@/types/movie";

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Serviço para operações relacionadas a filmes
 */
export const movieService = {
  async getMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(
        "https://wemovies-seven.vercel.app/api/movies",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch movies: ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error while fetching movies");
    }
  },
};
