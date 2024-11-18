import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string; // Optional className for custom styles
}

/**
 * A layout component that wraps the main content of the application.
 * @param children - The content to display inside the layout.
 * @param className - An optional class name for custom styles.
 * @returns The main layout component.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
}) => {
  return <main className={`main-layout  ${className}`}>{children}</main>;
};
