"use client";

import React from "react";
import Image from "next/image";
import type { Movie } from "@/types/movie";
import { useCartState } from "../../cart/hooks/useCartState";
import { useCartActions } from "../../cart/hooks/useCartActions";
import { CustomButton } from "@/components/ui/ButtonCustom";

interface MovieCardProps {
  movie: Movie;
}

/**
 * Componente de card de filme
 * Exibe informações do filme e permite adicionar ao carrinho
 */
export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { items } = useCartState();
  const { handleAddItem } = useCartActions();

  const cartItem = items.find((item) => item.id === movie.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    handleAddItem(movie);
  };

  return (
    <article className="flex flex-col gap-2 rounded bg-white p-4">
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-[188px] w-[147px]">
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="147px"
            priority
            quality={100}
          />
        </div>
        <h2 className="h-[18px] w-full text-center text-xs font-bold text-text-primary">
          {movie.title}
        </h2>
        <p className="text-center text-base font-bold text-dark">
          R$ {movie.price.toFixed(2).replace(".", ",")}
        </p>
      </div>
      <CustomButton
        fullWidth
        variant={quantity > 0 ? "selected" : "primary"}
        onClick={handleAddToCart}
        aria-label={`Adicionar ${movie.title} ao carrinho`}
        className="text-xs"
      >
        <div className="relative flex items-center">
          <Image
            src="/add-to-cart-icon.svg"
            alt="Adicionar ao carrinho"
            width={14}
            height={14}
            className="shrink-0"
            unoptimized
          />
          <span className="text-xs font-normal">{quantity}</span>
        </div>
        <span>ADICIONAR AO CARRINHO</span>
      </CustomButton>
    </article>
  );
};
