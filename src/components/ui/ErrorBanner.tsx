interface ErrorBannerProps {
  message: string;
  visible?: boolean;
  fontWeight?: string;
}

export function ErrorBanner({ message, visible = true, fontWeight = 'font-normal' }: ErrorBannerProps) {
  if (!visible) return null;

  return (
    <div className="flex w-full rounded-[8px] bg-[var(--color-error-bg)] overflow-hidden">
      <div className="w-[4px] bg-[var(--color-danger)] rounded-l-[8px] shrink-0" />
      <div className="flex-1 py-[10px] px-[12px]">
        <p className={`font-primary text-[13px] ${fontWeight} text-[var(--color-danger)]`}>
          {message}
        </p>
      </div>
    </div>
  );
}
