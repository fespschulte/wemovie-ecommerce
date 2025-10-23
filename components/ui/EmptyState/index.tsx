import React from "react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/ButtonCustom";
import { ResponsiveLayout } from "@/components/ui/ResponsiveLayout";

interface EmptyStateProps {
  title: string;
  imageSrc: string;
  imageSrcMobile?: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  imageSrc,
  imageSrcMobile,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex sm:min-h-[548px] items-start justify-center">
      <div className="flex flex-col items-center gap-6 bg-white py-12 sm:py-10 rounded-lg">
        <h2 className="max-w-[200px] sm:max-w-full text-lg font-bold text-dark text-center">
          {title}
        </h2>

        <div className="relative h-[265px] w-[178px] sm:h-[265px] sm:w-[447px]">
          <ResponsiveLayout
            desktop={
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
            }
            mobile={
              <Image
                src={imageSrcMobile || imageSrc}
                alt={title}
                fill
                className="object-contain"
                sizes="178px"
                priority
                quality={100}
                unoptimized
              />
            }
          />
        </div>

        <CustomButton
          variant="primary"
          onClick={onButtonClick}
          className="min-w-[173px] px-6 text-xs"
        >
          {buttonText}
        </CustomButton>
      </div>
    </div>
  );
};
