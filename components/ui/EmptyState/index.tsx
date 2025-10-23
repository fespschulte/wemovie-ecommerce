import React from "react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/ButtonCustom";

interface EmptyStateProps {
  title: string;
  imageSrc: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  imageSrc,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-lg">
        <h2 className="text-lg font-bold text-dark">{title}</h2>

        <div className="relative md:h-[265px] md:w-[447px]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            sizes="447px"
            priority
            quality={100}
            unoptimized
          />
        </div>

        <CustomButton
          variant="primary"
          onClick={onButtonClick}
          className="px-6"
        >
          {buttonText}
        </CustomButton>
      </div>
    </div>
  );
};
