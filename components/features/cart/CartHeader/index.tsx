import React from "react";

export const CartHeader: React.FC = () => {
  return (
    <div className="mb-6 hidden sm:flex items-start">
      <div className="w-[280px]">
        <span className="text-sm font-bold uppercase text-text-secondary">
          Produto
        </span>
      </div>
      <div className="flex-1 text-start">
        <span className="text-sm font-bold uppercase text-text-secondary">
          QTD
        </span>
      </div>
      <div className="flex-1 text-start">
        <span className="text-sm font-bold uppercase text-text-secondary">
          Subtotal
        </span>
      </div>
      <div className="w-8 text-start" />
    </div>
  );
};
