import { movieService } from "../movieService";

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock data
const mockMovies = [
  {
    id: 1,
    title: "Test Movie 1",
    price: 29.99,
    image: "/test1.jpg",
  },
  {
    id: 2,
    title: "Test Movie 2",
    price: 39.99,
    image: "/test2.jpg",
  },
];

describe("movieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMovies", () => {
    it("should fetch movies successfully", async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ products: mockMovies }),
      });

      // Act
      const result = await movieService.getMovies();

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        "https://wemovies-seven.vercel.app/api/movies",
        { cache: "no-store" }
      );
      expect(result).toEqual(mockMovies);
    });

    it("should handle API errors", async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      // Act & Assert
      await expect(movieService.getMovies()).rejects.toThrow(
        "Failed to fetch movies: Internal Server Error"
      );
    });

    it("should handle network errors", async () => {
      // Arrange
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      // Act & Assert
      await expect(movieService.getMovies()).rejects.toThrow("Network error");
    });

    it("should handle invalid JSON response", async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      // Act & Assert
      await expect(movieService.getMovies()).rejects.toThrow(
        "Network error while fetching movies"
      );
    });
  });
});
