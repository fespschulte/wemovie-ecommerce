"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartState } from "@/components/features/cart/hooks/useCartState";

export const Header: React.FC = () => {
  const { totalItems } = useCartState();

  return (
    <header className="bg-dark max-w-[1080px] mx-auto px-4 xl:px-0 py-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white cursor-pointer">
          WeMovies
        </Link>

        <Link
          href="/cart"
          className="flex items-center gap-2 cursor-pointer"
          aria-label={`Carrinho com ${totalItems} ${
            totalItems === 1 ? "item" : "itens"
          }`}
        >
          <div className="flex flex-col items-end">
            <span className="hidden sm:block text-sm font-semibold text-white">
              Meu Carrinho
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              {totalItems} {totalItems === 1 ? "item" : "itens"}
            </span>
          </div>

          <div className="p-2">
            <Image
              src="/cart-icon.svg"
              alt="Carrinho de compras"
              width={24}
              height={24}
              unoptimized
            />
          </div>
        </Link>
      </div>
    </header>
  );
};
