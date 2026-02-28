import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'dark' | 'outline';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  onClick,
  loading = false,
  loadingText = 'Loading...',
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'flex items-center justify-center w-full h-[46px] rounded-[10px] font-primary text-[14px] font-bold transition-colors cursor-pointer';

  const variantClasses = {
    primary: 'bg-[var(--color-accent-cta)] text-white hover:bg-[#1D4ED8]',
    dark: 'bg-[#1E293B] text-white hover:bg-[#0F172A]',
    outline:
      'border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-canvas)]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled || loading ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
    >
      {loading ? (
        <>
          <Loader2 size={14} className="animate-spin mr-2" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
