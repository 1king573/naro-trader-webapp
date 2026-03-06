import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '../components/ui/FormInput';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import { Button } from '../components/ui/Button';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('An account with this email already exists.');
    }, 1500);
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-[var(--color-bg-canvas)]">
      <div className="w-full max-w-[420px] mx-4 md:mx-0 bg-[var(--color-bg-card)] rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] pt-[28px] px-[28px] pb-[24px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-[12px] w-full">
            <h1 className="font-brand italic font-semibold text-[24px] leading-[1] text-center w-full text-[var(--color-brand-primary)]">
              Naro Traders
            </h1>
            <p className="font-primary text-[13px] text-center w-full text-[var(--color-text-secondary)] leading-[1.6]">
              Trade Smarter. Manage Easier.
            </p>
            <h2 className="font-primary text-[24px] font-bold leading-[1] text-center w-full text-[var(--color-text-primary)]">
              Create your account
            </h2>
            <div className="flex items-center justify-center gap-[6px]">
              <span className="font-primary text-[14px] text-[var(--color-text-secondary)] leading-[1.6]">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="font-primary text-[14px] font-medium text-[var(--color-accent-cta)] leading-[1.6] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col gap-[16px] w-full">
            <FormInput
              label="Full Name"
              placeholder="John Trader"
              value={fullName}
              onChange={setFullName}
            />
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />
            <FormInput
              label="Password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={setPassword}
              showPasswordToggle
            />

            <ErrorBanner message={error} visible={!!error} />

            <Button type="submit" loading={loading} loadingText="Creating...">
              Create Account
            </Button>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col gap-[10px] w-full">
            <p className="font-primary text-[12px] text-[var(--color-text-secondary)]">
              By registering, you agree to our
            </p>
            <Link
              to="#"
              className="font-primary text-[12px] font-medium text-[var(--color-accent-cta)] hover:underline"
            >
              Terms &amp; Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
