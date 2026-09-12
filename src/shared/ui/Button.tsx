import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

const baseStyles = 'inline-flex items-center justify-center font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1312] disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/50 shadow-md',
  secondary: 'bg-[#1b4332] hover:bg-[#2d6a4f] text-emerald-100 border border-emerald-800',
  tertiary: 'bg-[#0d1f18] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40',
  ghost: 'bg-transparent hover:bg-emerald-900/40 text-emerald-300 border border-transparent',
  danger: 'bg-red-900/80 hover:bg-red-700 text-red-50 border border-red-800/50',
  link: 'bg-transparent text-emerald-400 hover:text-emerald-300 underline underline-offset-4 border-none p-0 h-auto'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2',
  icon: 'p-2.5 rounded-xl justify-center aspect-square'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const classes = `${baseStyles} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${className}`;

    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', leftIcon, rightIcon, children, href, external, ...props }, ref) => {
    const classes = `${baseStyles} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${className}`;

    if (external) {
      return (
        <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
          {leftIcon}
          {children}
          {rightIcon}
        </a>
      );
    }

    return (
      <Link to={href} ref={ref as any} className={classes} {...(props as any)}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    );
  }
);
LinkButton.displayName = 'LinkButton';
