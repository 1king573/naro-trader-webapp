import { Link } from 'react-router-dom';
import { Shield, ArrowDown, ArrowRight, ArrowLeft, Landmark } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function WalletPage() {
  return (
    <AuthenticatedLayout title="Wallet">
      <div className="flex flex-col gap-[16px]">
        {/* Hero Card */}
        <div className="flex flex-col gap-[16px] rounded-[12px] bg-[var(--color-bg-card)] p-[28px_32px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="font-primary text-[22px] font-bold text-[var(--color-text-primary)]">Wallet Overview</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-[14px]">
            <BalanceBlock label="Available Balance" value="$1,250.00" color="var(--color-success)" />
            <div className="hidden md:block w-[1px] h-[84px] bg-[var(--color-border-default)]" />
            <BalanceBlock label="On Hold" value="$300.00" color="var(--color-warning)" />
            <div className="hidden md:block w-[1px] h-[84px] bg-[var(--color-border-default)]" />
            <BalanceBlock label="Total Balance" value="$1,550.00" color="var(--color-text-primary)" />
          </div>
        </div>

        {/* Held Balance Info */}
        <div className="flex gap-[14px] rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] p-[16px_20px]">
          <Shield size={18} className="text-[var(--color-accent-cta)] shrink-0 mt-[2px]" />
          <div className="flex flex-col gap-[6px]">
            <span className="font-primary text-[14px] font-bold text-[#1E40AF]">What is a Held Balance?</span>
            <p className="font-primary text-[13px] text-[#1D4ED8] leading-[1.6]">
              When you submit a transfer or withdrawal request, the amount is temporarily held and deducted from your available balance. If the request is rejected or cancelled, the hold is released and funds return to available.
            </p>
          </div>
        </div>

        {/* Balance Breakdown Bar */}
        <div className="flex flex-col gap-[10px] px-[4px]">
          <div className="flex h-[12px] rounded-full bg-[var(--color-border-default)] overflow-hidden">
            <div className="h-full rounded-full bg-[var(--color-success)]" style={{ flex: 1 }} />
            <div className="h-full rounded-full bg-[var(--color-warning)]" style={{ width: 180 }} />
          </div>
          <div className="flex gap-[20px]">
            <span className="font-primary text-[13px] text-[var(--color-success)]">Available — $1,250.00</span>
            <span className="font-primary text-[13px] text-[var(--color-warning)]">On Hold — $300.00</span>
          </div>
        </div>

        {/* Move Funds */}
        <div className="flex flex-col gap-[12px]">
          <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">Move Funds</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <MoveFundCard title="Deposit to Wallet" desc="Add funds via external payment" icon={<ArrowDown size={20} />} color="var(--color-success)" to="/transactions/new/deposit-wallet" />
            <MoveFundCard title="Fund cTrader" desc="Transfer from wallet to cTrader" icon={<ArrowRight size={20} />} color="var(--color-accent-cta)" to="/transactions/new/wallet-to-ctrader" />
            <MoveFundCard title="Withdraw from cTrader" desc="Move funds back to wallet" icon={<ArrowLeft size={20} />} color="#7C3AED" to="/transactions/new/ctrader-to-wallet" />
            <MoveFundCard title="External Withdrawal" desc="Withdraw to external account" icon={<Landmark size={20} />} color="#EA580C" to="/transactions/new/wallet-withdrawal" />
          </div>
        </div>

        {/* Recent Wallet Activity */}
        <div className="flex flex-col gap-[16px] bg-[var(--color-bg-card)] border border-[var(--color-border-default)] p-[28px]">
          <div className="flex items-center justify-between">
            <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">Recent Activity</span>
            <Link to="/transactions" className="font-primary text-[13px] font-medium text-[var(--color-accent-cta)]">View all</Link>
          </div>
          <div className="flex items-center gap-[12px]">
            <span className="font-primary text-[12px] font-medium text-[var(--color-text-secondary)]">Wallet:</span>
            <span className="font-primary text-[12px] font-semibold text-[var(--color-accent-cta)] bg-[#EFF6FF] rounded-full px-[10px] py-[5px]">All Transactions</span>
          </div>
          <div className="overflow-x-auto"><div className="flex flex-col min-w-[600px]">
            <div className="flex items-center gap-[12px] py-[14px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)]">
              <span className="w-[200px]">REQUEST CODE</span>
              <span className="w-[140px]">TYPE</span>
              <span className="w-[120px] text-right">AMOUNT</span>
              <span className="flex-1">STATUS</span>
            </div>
            <div className="h-[1px] bg-[var(--color-border-default)]" />
            <ActivityRow code="TRX-20260227-ABC" type="Deposit" amount="+$300.00" amountColor="var(--color-success)" status="Pending" />
            <ActivityRow code="TRX-20260226-XYZ" type="Fund cTrader" amount="-$500.00" amountColor="var(--color-danger)" status="Approved" />
            <ActivityRow code="TRX-20260225-QWE" type="Deposit" amount="+$1,000.00" amountColor="var(--color-success)" status="Approved" />
          </div></div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function BalanceBlock({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col gap-[4px] flex-1">
      <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">{label}</span>
      <span className="font-primary text-[28px] font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

function MoveFundCard({ title, desc, icon, color, to }: { title: string; desc: string; icon: React.ReactNode; color: string; to: string }) {
  return (
    <Link to={to} className="flex flex-col gap-[8px] flex-1 rounded-[12px] bg-[var(--color-bg-card)] p-[20px] border border-[var(--color-border-default)] hover:shadow-md transition-shadow">
      <div style={{ color }}>{icon}</div>
      <span className="font-primary text-[14px] font-bold text-[var(--color-text-primary)]">{title}</span>
      <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">{desc}</span>
    </Link>
  );
}

function ActivityRow({ code, type, amount, amountColor, status }: { code: string; type: string; amount: string; amountColor: string; status: string }) {
  const statusColors: Record<string, string> = {
    Pending: 'bg-[#FFF7ED] text-[#92400E]',
    Approved: 'bg-[#ECFDF5] text-[var(--color-success)]',
  };
  return (
    <div className="flex items-center gap-[12px] py-[12px]">
      <span className="w-[200px] font-primary text-[13px] text-[var(--color-text-primary)]">{code}</span>
      <span className="w-[140px] font-primary text-[13px] text-[var(--color-text-secondary)]">{type}</span>
      <span className="w-[120px] font-primary text-[13px] font-semibold text-right" style={{ color: amountColor }}>{amount}</span>
      <span className={`font-primary text-[12px] font-semibold px-[10px] py-[4px] rounded-full ${statusColors[status]}`}>{status}</span>
    </div>
  );
}
