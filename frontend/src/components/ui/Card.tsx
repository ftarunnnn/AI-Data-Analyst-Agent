import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl p-6 transition-all duration-300',
          'bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/80',
          'border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200',
          'backdrop-blur-md shadow-xl shadow-slate-950/20',
          hoverEffect && 'hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:shadow-2xl',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
