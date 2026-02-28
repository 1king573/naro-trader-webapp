import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPasswordToggle?: boolean;
  focused?: boolean;
  inputHeight?: string;
  borderRadius?: string;
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  showPasswordToggle = false,
  focused = false,
  inputHeight = 'h-[44px]',
  borderRadius = 'rounded-[10px]',
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(focused);
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-[7px] w-full">
      <label className="font-primary text-[14px] font-medium text-[var(--color-text-primary)]">
        {label}
      </label>
      <div
        className={`flex items-center ${inputHeight} w-full ${borderRadius} px-[14px] bg-[var(--color-bg-card)] border ${
          isFocused
            ? 'border-[var(--color-accent-cta)] shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'
            : 'border-[var(--color-border-default)]'
        } transition-all`}
      >
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none font-primary text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--color-text-secondary)] ml-2 shrink-0"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="font-primary text-[12px] text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
}
