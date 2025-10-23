import React from "react";
import Image from "next/image";
import { DeleteConfirmation } from "../DeleteConfirmation";

interface RemoveButtonProps {
  onRemove: () => void;
  disabled?: boolean;
  className?: string;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  onRemove,
  disabled = false,
  className = "",
}) => {
  return (
    <DeleteConfirmation
      onConfirm={onRemove}
      title="Remover item do carrinho"
      description="Tem certeza que deseja remover este item do seu carrinho? Esta ação não pode ser desfeita."
      trigger={
        <button
          disabled={disabled}
          className={`flex h-5 w-5 items-center justify-center rounded-full text-primary transition-colors hover:text-primary-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          aria-label="Remover item do carrinho"
        >
          <Image
            src="/trash-icon.svg"
            alt="Remover item do carrinho"
            width={24}
            height={24}
            className="shrink-0"
            unoptimized
          />
        </button>
      }
    />
  );
};
