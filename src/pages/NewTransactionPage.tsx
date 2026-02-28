import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, ArrowRight, Landmark, ShieldCheck } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

const options = [
  {
    title: 'Deposit to Wallet',
    desc: 'Add funds to your platform wallet by submitting a deposit request with your payment reference.',
    icon: ArrowDown,
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
    flowLabel: 'External → Wallet',
    flowColor: '#10B981',
    to: '/transactions/new/deposit-wallet',
  },
  {
    title: 'Fund cTrader Account',
    desc: 'Move funds from your wallet to your cTrader trading account. Funds will be held until admin approves.',
    icon: ArrowRight,
    iconColor: '#2563EB',
    iconBg: '#EFF6FF',
    flowLabel: 'Wallet → cTrader',
    flowColor: '#2563EB',
    to: '/transactions/new/wallet-to-ctrader',
  },
  {
    title: 'Withdraw from cTrader',
    desc: 'Pull funds from your cTrader account back into your platform wallet. Requires admin approval.',
    icon: ArrowLeft,
    iconColor: '#7C3AED',
    iconBg: '#F5F3FF',
    flowLabel: 'cTrader → Wallet',
    flowColor: '#7C3AED',
    to: '/transactions/new/ctrader-to-wallet',
  },
  {
    title: 'Withdraw Externally',
    desc: 'Request a withdrawal from your wallet to an external payment method. Funds will be held pending approval.',
    icon: Landmark,
    iconColor: '#EA580C',
    iconBg: '#FFF7ED',
    flowLabel: 'Wallet → External',
    flowColor: '#EA580C',
    to: '/transactions/new/wallet-withdrawal',
  },
];

const recentRequests = [
  { code: 'TRX-20260227-ABC123', type: 'Deposit', typeBg: '#F8FAFC', typeColor: '#10B981', amount: '$1,245.00', status: 'Approved', statusBg: '#ECFDF5', statusColor: '#10B981' },
  { code: 'TRX-20260226-XYZ945', type: 'Withdrawal', typeBg: '#F8FAFC', typeColor: '#EA580C', amount: '$320.50', status: 'Rejected', statusBg: '#FEF2F2', statusColor: '#EF4444' },
  { code: 'TRX-20260225-QWE771', type: 'cTrader → Wallet', typeBg: '#F5F3FF', typeColor: '#7C3AED', amount: '$980.00', status: 'Approved', statusBg: '#ECFDF5', statusColor: '#10B981' },
];

export function NewTransactionPage() {
  return (
    <AuthenticatedLayout title="New Request">
      <div className="flex flex-col gap-[16px]">
        {/* Back + Header */}
        <div className="flex flex-col gap-[8px]">
          <Link to="/transactions" className="flex items-center gap-[6px] font-primary text-[13px] font-medium text-[var(--color-accent-cta)]">
            <ArrowLeft size={14} />
            Back to Transactions
          </Link>
          <span className="font-primary text-[22px] font-bold text-[#0F172A]">What would you like to do?</span>
          <p className="font-primary text-[14px] text-[#64748B] max-w-[520px]">
            Choose the type of request you want to submit. All requests require admin approval before processing.
          </p>
        </div>

        {/* Option Grid */}
        <div className="flex gap-[20px]">
          <div className="flex flex-col gap-[20px] flex-1">
            {options.filter((_, i) => i % 2 === 0).map((opt) => (
              <OptionCard key={opt.to} {...opt} />
            ))}
          </div>
          <div className="flex flex-col gap-[20px] flex-1">
            {options.filter((_, i) => i % 2 === 1).map((opt) => (
              <OptionCard key={opt.to} {...opt} />
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex gap-[12px] rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] p-[16px_20px]">
          <ShieldCheck size={18} className="text-[#2563EB] shrink-0 mt-[1px]" />
          <div className="flex flex-col gap-[4px]">
            <span className="font-primary text-[14px] font-bold text-[#1E40AF]">All requests require admin approval</span>
            <p className="font-primary text-[13px] text-[#1D4ED8]">
              Once submitted, your request will be reviewed by an admin before any funds are moved. You'll be able to track the status in your transaction history.
            </p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="flex flex-col gap-[8px]">
          <span className="font-primary text-[13px] font-bold text-[#64748B]">Your recent requests</span>
          <div className="flex items-center h-[24px] font-primary text-[12px] font-medium text-[var(--color-text-secondary)]">
            <span className="w-[220px]">Request Code</span>
            <span className="w-[180px]">Type</span>
            <span className="w-[180px]">Amount</span>
            <span className="w-[180px]">Status</span>
          </div>
          {recentRequests.map((r) => (
            <div key={r.code} className="flex items-center h-[40px] border-t border-[var(--color-border-default)]">
              <span className="w-[220px] font-primary text-[13px] text-[var(--color-text-primary)]">{r.code}</span>
              <div className="w-[180px]">
                <span className="font-primary text-[12px] font-semibold rounded-full px-[10px] py-[4px]" style={{ backgroundColor: r.typeBg, color: r.typeColor }}>{r.type}</span>
              </div>
              <span className="w-[180px] font-primary text-[13px] text-[var(--color-text-primary)]">{r.amount}</span>
              <div className="w-[180px]">
                <span className="font-primary text-[12px] font-semibold rounded-full px-[10px] py-[4px]" style={{ backgroundColor: r.statusBg, color: r.statusColor }}>{r.status}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-end h-[24px]">
            <Link to="/transactions" className="font-primary text-[13px] font-medium text-[#2563EB] hover:underline">View all transactions</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function OptionCard({ title, desc, icon: Icon, iconColor, iconBg, flowLabel, flowColor, to }: {
  title: string; desc: string; icon: typeof ArrowDown; iconColor: string; iconBg: string; flowLabel: string; flowColor: string; to: string;
}) {
  return (
    <Link to={to} className="flex flex-col gap-[12px] h-[190px] rounded-[16px] bg-white border border-[#E2E8F0] p-[28px] hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px]" style={{ backgroundColor: iconBg }}>
        <Icon size={24} style={{ color: iconColor }} />
      </div>
      <span className="font-primary text-[16px] font-bold text-[#0F172A]">{title}</span>
      <p className="font-primary text-[13px] text-[#64748B] flex-1">{desc}</p>
      <div className="flex items-center justify-between">
        <span className="font-primary text-[12px] font-semibold" style={{ color: flowColor }}>{flowLabel}</span>
        <ArrowRight size={16} style={{ color: flowColor }} />
      </div>
    </Link>
  );
}
