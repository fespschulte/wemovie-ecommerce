import { renderHook, waitFor } from "@testing-library/react";
import { useMovies } from "../useMovies";
import { movieService } from "../../services/movieService";

// Mock do movieService
jest.mock("../../services/movieService");
const mockMovieService = movieService as jest.Mocked<typeof movieService>;

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

describe("useMovies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", () => {
    // Arrange
    mockMovieService.getMovies.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    // Act
    const { result } = renderHook(() => useMovies());

    // Assert
    expect(result.current.loading).toBe(true);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should fetch movies successfully", async () => {
    // Arrange
    mockMovieService.getMovies.mockResolvedValueOnce(mockMovies);

    // Act
    const { result } = renderHook(() => useMovies());

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
    expect(mockMovieService.getMovies).toHaveBeenCalledTimes(1);
  });

  it("should handle fetch errors", async () => {
    // Arrange
    const errorMessage = "API Error";
    mockMovieService.getMovies.mockRejectedValueOnce(new Error(errorMessage));

    // Act
    const { result } = renderHook(() => useMovies());

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it("should handle empty response", async () => {
    // Arrange
    mockMovieService.getMovies.mockResolvedValueOnce([]);

    // Act
    const { result } = renderHook(() => useMovies());

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should handle non-array response", async () => {
    // Arrange
    mockMovieService.getMovies.mockResolvedValueOnce(
      null as unknown as Movie[]
    );

    // Act
    const { result } = renderHook(() => useMovies());

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
