import { Link } from 'react-router-dom';
import { CalendarDays, CircleCheck, ShieldCheck, Wallet, RefreshCw, ExternalLink } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function ProfilePage() {
  return (
    <AuthenticatedLayout title="Profile">
      <div className="flex flex-col gap-[20px]">
        {/* Profile Hero */}
        <div className="flex justify-between rounded-[12px] bg-white p-[28px_32px] border border-[#E2E8F0] shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[var(--color-accent-cta)]">
              <span className="font-primary text-[28px] font-bold text-white">JT</span>
            </div>
            <span className="font-primary text-[22px] font-bold text-[#0F172A]">John Trader</span>
            <span className="font-primary text-[14px] text-[#64748B]">john@example.com</span>
            <div className="flex items-center gap-[6px]">
              <CalendarDays size={14} className="text-[#94A3B8]" />
              <span className="font-primary text-[12px] text-[#94A3B8]">Member since Feb 2026</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-[10px] w-[280px]">
            <StatusBadge icon={<CircleCheck size={14} />} label="ACTIVE" color="#10B981" bg="#ECFDF5" />
            <StatusBadge icon={<ShieldCheck size={14} />} label="KYC Verified" color="#10B981" bg="#ECFDF5" />
          </div>
        </div>

        {/* Two Column */}
        <div className="flex flex-col lg:flex-row gap-[20px]">
          {/* Left Column */}
          <div className="flex flex-col gap-[20px] flex-1 min-w-0">
            {/* Account Information */}
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-white p-[24px] border border-[#E2E8F0]">
              <span className="font-primary text-[16px] font-bold text-[#0F172A]">Account Information</span>
              <div className="h-[1px] bg-[#E2E8F0]" />
              <InfoRow label="Full Name" value="John Trader" />
              <InfoRow label="Email" value="john@example.com" />
              <InfoRow label="Account ID" value="USR-20260201-JT001" mono />
              <InfoRow label="Registration Date" value="February 1, 2026" />
              <InfoRow label="Account Status" value="Active" valueColor="#10B981" />
              <p className="font-primary text-[12px] text-[#94A3B8] italic text-center">
                To update your profile information, please contact support.
              </p>
            </div>

            {/* KYC Card */}
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-white p-[24px] border border-[#E2E8F0]">
              <span className="font-primary text-[16px] font-bold text-[#0F172A]">KYC Verification</span>
              <div className="h-[1px] bg-[#E2E8F0]" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-[16px] p-[24px_16px]">
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-[12px] bg-[#ECFDF5] shrink-0">
                  <ShieldCheck size={28} className="text-[var(--color-accent-cta)]" />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <span className="font-primary text-[16px] font-bold text-[#0F172A]">Identity Verified</span>
                  <p className="font-primary text-[13px] text-[#64748B] leading-[1.5]">
                    Your identity has been verified. You have full access to all platform features.
                  </p>
                </div>
                <Link
                  to="/profile/kyc"
                  className="font-primary text-[13px] font-semibold text-[var(--color-accent-cta)] hover:underline shrink-0"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[16px] w-full lg:w-[420px] lg:shrink-0">
            {/* Account Summary */}
            <div className="flex flex-col gap-[16px] rounded-[12px] bg-[var(--color-bg-card)] p-[20px] border border-[var(--color-border-default)]">
              <div className="flex flex-col gap-[4px]">
                <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">Account Summary</span>
                <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Quick overview of your activity</span>
              </div>
              <div className="flex flex-col gap-[12px]">
                <SummaryRow icon={<Wallet size={16} />} label="Wallet Balance" value="$1,250.00" />
                <SummaryRow icon={<RefreshCw size={16} />} label="Pending Requests" value="2" />
              </div>
              <div className="flex gap-[16px]">
                <Link to="/wallet" className="flex items-center gap-[6px] font-primary text-[13px] font-medium text-[var(--color-accent-cta)] hover:underline">
                  <ExternalLink size={14} />
                  View Wallet
                </Link>
                <Link to="/transactions" className="flex items-center gap-[6px] font-primary text-[13px] font-medium text-[var(--color-accent-cta)] hover:underline">
                  <ExternalLink size={14} />
                  Transactions
                </Link>
              </div>
            </div>

            {/* Security Card */}
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-[var(--color-bg-card)] p-[20px] border border-[var(--color-border-default)]">
              <div className="flex flex-col gap-[4px]">
                <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">Security</span>
                <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Manage your account security</span>
              </div>
              <div className="flex items-center justify-between py-[8px]">
                <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">Password</span>
                <span className="font-primary text-[13px] text-[var(--color-text-primary)]">Last changed 30 days ago</span>
              </div>
              <div className="flex items-center justify-between py-[8px]">
                <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">Two-Factor Auth</span>
                <span className="font-primary text-[13px] font-semibold text-[var(--color-success)]">Enabled</span>
              </div>
              <p className="font-primary text-[12px] text-[var(--color-text-secondary)] leading-[1.4]">
                Security changes may require re-authentication on your next sign-in.
              </p>
            </div>

            {/* Danger Zone */}
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-[var(--color-error-bg)] p-[20px] border border-[var(--color-border-default)]">
              <span className="font-primary text-[18px] font-semibold text-[var(--color-text-primary)]">Danger Zone</span>
              <div className="flex items-center justify-between">
                <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">Permanently delete your account and all data</span>
              </div>
              <button className="flex items-center justify-center rounded-[10px] border border-[var(--color-danger)] px-[14px] py-[10px] font-primary text-[13px] font-semibold text-[var(--color-danger)] cursor-pointer hover:bg-[var(--color-danger)] hover:text-white transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function StatusBadge({ icon, label, color, bg }: { icon: React.ReactNode; label: string; color: string; bg: string }) {
  return (
    <div className="flex items-center gap-[8px] rounded-full px-[12px] py-[8px]" style={{ backgroundColor: bg, color }}>
      {icon}
      <span className="font-primary text-[13px] font-bold">{label}</span>
    </div>
  );
}

function InfoRow({ label, value, mono, valueColor }: { label: string; value: string; mono?: boolean; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between py-[10px] border-b border-[#F1F5F9] last:border-b-0">
      <span className="font-primary text-[13px] text-[#64748B]">{label}</span>
      <span
        className={`${mono ? 'font-mono' : 'font-primary'} text-[14px] font-semibold`}
        style={{ color: valueColor || '#0F172A' }}
      >
        {value}
      </span>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[8px]">
        <span className="text-[var(--color-text-secondary)]">{icon}</span>
        <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">{label}</span>
      </div>
      <span className="font-primary text-[14px] font-bold text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}
