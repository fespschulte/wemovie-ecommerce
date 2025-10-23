import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = () => {
  return (
    <EmptyState
      title="Parece que não há nada por aqui :("
      imageSrc="/not-found.png"
      imageSrcMobile="/not-found-mobile.png"
      buttonText="Recarregar página"
      onButtonClick={() => (window.location.href = "/")}
    />
  );
};
