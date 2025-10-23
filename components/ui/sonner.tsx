"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white text-gray-900 border border-gray-200 shadow-lg rounded-lg",
          description: "text-gray-600",
          actionButton: "bg-primary text-white hover:bg-primary-hover",
          cancelButton: "bg-gray-100 text-gray-700 hover:bg-gray-200",
          title: "text-gray-900 font-semibold",
          success: "bg-green-50 border-green-200 text-green-800",
          error: "bg-red-50 border-red-200 text-red-800",
          warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
          info: "bg-blue-50 border-blue-200 text-blue-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
