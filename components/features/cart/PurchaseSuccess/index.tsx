"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePurchase } from "../hooks/usePurchase";
import { CustomButton } from "@/components/ui/ButtonCustom";

export const PurchaseSuccess: React.FC = () => {
  const router = useRouter();
  const { resetPurchase } = usePurchase();

  const handleBackToHome = () => {
    resetPurchase();
    router.push("/");
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-lg">
        <h2 className="text-lg font-bold text-dark">
          Compra realizada com sucesso!
        </h2>

        <div className="relative h-[247px] w-[238px] md:h-[307px] md:w-[294px]">
          <Image
            src="/sucessful-purchase.png"
            alt="Compra realizada com sucesso"
            fill
            className="object-contain"
            sizes="307px"
            priority
            quality={100}
            unoptimized
          />
        </div>

        <CustomButton
          variant="primary"
          onClick={handleBackToHome}
          className="px-6"
        >
          VOLTAR
        </CustomButton>
      </div>
    </div>
  );
};
