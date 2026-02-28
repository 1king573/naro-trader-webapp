import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/ui/FormInput';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (email === 'dev@dev.com' && password === 'Admin@123') {
        navigate('/dashboard');
      } else {
        setLoading(false);
        setError('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-[var(--color-bg-canvas)]">
      <div className="w-[420px] bg-[var(--color-bg-card)] rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] pt-[28px] px-[28px] pb-[24px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-[14px] w-full">
            <h1 className="font-brand italic font-semibold text-[24px] leading-[1.05] text-center w-full text-[var(--color-brand-primary)]">
              Naro Traders
            </h1>
            <p className="font-primary text-[13px] text-center w-full text-[var(--color-text-secondary)] leading-[1.5]">
              Trade Smarter. Manage Easier.
            </p>
            <h2 className="font-primary text-[24px] font-bold leading-[1.05] text-center w-full text-[var(--color-text-primary)]">
              Welcome back
            </h2>
            <div className="flex items-center justify-center gap-[8px] w-full">
              <span className="font-primary text-[14px] text-[var(--color-text-secondary)] leading-[1.5] text-center">
                Don't have an account?
              </span>
              <Link
                to="/register"
                className="font-primary text-[14px] font-medium text-[var(--color-accent-cta)] leading-[1.5] text-center hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col gap-[14px] w-full">
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />
            <FormInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={setPassword}
              showPasswordToggle
            />

            {/* Forgot password */}
            <div className="flex justify-end w-full px-[2px]">
              <Link
                to="#"
                className="font-primary text-[13px] font-medium text-[var(--color-accent-cta)] text-right hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <ErrorBanner message={error} visible={!!error} />

            <Button type="submit" loading={loading} loadingText="Signing in...">
              Sign In
            </Button>
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-center gap-[8px] w-full">
            <p className="font-primary text-[12px] text-[var(--color-text-secondary)] text-center">
              Protected by 256-bit encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
