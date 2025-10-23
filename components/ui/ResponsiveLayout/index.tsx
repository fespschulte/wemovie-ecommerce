import React from "react";

interface ResponsiveLayoutProps {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
  className?: string;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  desktop,
  mobile,
  className = "",
}) => {
  return (
    <div className={className}>
      {/* Desktop Layout */}
      <div className="hidden sm:block">{desktop}</div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">{mobile}</div>
    </div>
  );
};
