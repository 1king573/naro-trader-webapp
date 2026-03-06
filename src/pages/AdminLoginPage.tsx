import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Loader2, EyeOff, Eye } from 'lucide-react';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (email === 'dev@dev.com' && password === 'Admin@123') {
        navigate('/admin/approvals');
      } else {
        setLoading(false);
        setError('Invalid admin credentials. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-[20px] bg-[#0D1B2A]">
      {/* Card */}
      <div className="w-full max-w-[420px] mx-4 md:mx-0 bg-white rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.3)] p-[36px]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[20px]">
          {/* Admin Badge */}
          <div className="flex items-center gap-[6px] bg-[#1E293B] rounded-full py-[6px] px-[12px]">
            <Shield size={14} className="text-[#94A3B8]" />
            <span className="font-primary text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[1px]">
              Admin Portal
            </span>
          </div>

          {/* Logo Block */}
          <div className="flex flex-col items-center gap-[6px] w-full">
            <h1 className="font-primary text-[22px] font-bold text-[#0F172A] text-center">
              Naro Traders
            </h1>
            <p className="font-primary text-[13px] text-[#64748B] text-center">
              Administration Panel
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#E2E8F0]" />

          {/* Sign in heading — left aligned */}
          <h2 className="w-full font-primary text-[20px] font-bold text-[#0F172A]">
            Sign in to Admin
          </h2>

          {/* Form Fields */}
          <div className="flex flex-col gap-[14px] w-full">
            {/* Email */}
            <div className="flex flex-col gap-[7px] w-full">
              <label className="font-primary text-[14px] font-medium text-[#0F172A]">
                Admin Email
              </label>
              <div
                className={`flex items-center h-[48px] w-full rounded-[8px] px-[14px] bg-white border transition-all ${
                  emailFocused
                    ? 'border-[var(--color-accent-cta)] shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <input
                  type="email"
                  placeholder="admin@narotraders.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="flex-1 bg-transparent outline-none font-primary text-[14px] text-[#0F172A] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[7px] w-full">
              <label className="font-primary text-[14px] font-medium text-[#0F172A]">
                Password
              </label>
              <div
                className={`flex items-center justify-between h-[48px] w-full rounded-[8px] px-[14px] bg-white border transition-all ${
                  passwordFocused
                    ? 'border-[var(--color-accent-cta)] shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="flex-1 bg-transparent outline-none font-primary text-[14px] text-[#0F172A] placeholder:text-[#94A3B8]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#94A3B8] ml-2 shrink-0"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex w-full rounded-[8px] bg-[#FEF2F2] overflow-hidden">
              <div className="w-[4px] bg-[#EF4444] rounded-l-[8px] shrink-0" />
              <div className="flex-1 py-[10px] px-[12px]">
                <p className="font-primary text-[13px] font-medium text-[#EF4444]">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* CTA Button — dark slate, NOT blue */}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center w-full h-[48px] rounded-[10px] font-primary text-[15px] font-bold text-white transition-colors cursor-pointer ${
              loading
                ? 'bg-[#1E293B] opacity-70 cursor-not-allowed'
                : 'bg-[#1E293B] hover:bg-[#0F172A]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In to Admin Panel'
            )}
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-[6px] w-full">
            <Shield size={14} className="text-[#94A3B8]" />
            <p className="font-primary text-[12px] text-[#94A3B8] text-center">
              This is a restricted area. Unauthorized access is prohibited.
            </p>
          </div>
        </form>
      </div>

      {/* Back to user login — below card */}
      <Link
        to="/login"
        className="font-primary text-[13px] text-[#94A3B8] hover:text-white transition-colors"
      >
        ← Back to user login
      </Link>
    </div>
  );
}
