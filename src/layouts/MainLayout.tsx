import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string; // Optional className for custom styles
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
}) => {
  return <main className={`main-layout  ${className}`}>{children}</main>;
};
