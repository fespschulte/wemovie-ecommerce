"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePurchase } from "../hooks/usePurchase";
import { EmptyState } from "@/components/ui/EmptyState";

export const PurchaseSuccess: React.FC = () => {
  const router = useRouter();
  const { resetPurchase } = usePurchase();

  const handleBackToHome = () => {
    resetPurchase();
    router.push("/");
  };

  return (
    <EmptyState
      title="Compra realizada com sucesso!"
      imageSrc="/sucessful-purchase.png"
      buttonText="VOLTAR"
      onButtonClick={handleBackToHome}
    />
  );
};
