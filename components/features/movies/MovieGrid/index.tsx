"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MovieCard } from "../MovieCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useMovies } from "../hooks/useMovies";

/**
 * Componente de grid de filmes
 */
export const MovieGrid: React.FC = () => {
  const { movies, loading, error } = useMovies();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Image
          src="/loader.svg"
          alt="Carregando..."
          width={83}
          height={83}
          className="animate-spin"
          unoptimized
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-red-500">Erro ao carregar filmes: {error}</p>
      </div>
    );
  }

  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <EmptyState
        title="Parece que não há nada por aqui :("
        imageSrc="/not-found.png"
        imageSrcMobile="/not-found-mobile.png"
        buttonText="Recarregar página"
        onButtonClick={() => router.push("/")}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
