import { Clock3, ChartColumn, Wallet } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function CTraderAccountsPage() {
  return (
    <AuthenticatedLayout title="cTrader Accounts">
      <div className="flex flex-col gap-[16px]">
        {/* Info Banner */}
        <div className="flex gap-[16px] rounded-[0px] bg-[#EFF6FF] border border-[#BFDBFE] p-[16px_24px]">
          <div className="flex items-center justify-center w-[32px] h-[32px] shrink-0 bg-[#DBEAFE] rounded-[0px]">
            <ChartColumn size={18} className="text-[var(--color-accent-cta)]" />
          </div>
          <div className="flex flex-col gap-[4px] flex-1">
            <span className="font-primary text-[14px] font-bold text-[#1E40AF]">About your account balances</span>
            <p className="font-primary text-[13px] text-[#1D4ED8] leading-[1.6]">
              Balance reflects your deposited funds. Equity includes unrealised profit and loss from open positions. Free margin is what's available to open new trades.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[10px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-primary text-[20px] font-bold text-[var(--color-text-primary)]">Your Trading Accounts</span>
            <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">Live and demo accounts linked to your profile</span>
          </div>
          <div className="flex items-center gap-[8px] bg-[#F1F5F9] rounded-full px-[12px] py-[6px] w-fit">
            <Clock3 size={14} className="text-[var(--color-text-secondary)]" />
            <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Last synced: 5 mins ago</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col">
          <div className="flex gap-[20px]">
            <span className="font-primary text-[14px] font-semibold text-[var(--color-accent-cta)]">All</span>
            <span className="font-primary text-[14px] text-[var(--color-text-secondary)]">Live</span>
            <span className="font-primary text-[14px] text-[var(--color-text-secondary)]">Demo</span>
          </div>
          <div className="h-[1px] bg-[var(--color-border-default)] mt-[8px]" />
          <div className="h-[2px] bg-[var(--color-accent-cta)] w-[22px]" />
        </div>

        {/* Account Cards */}
        <div className="flex flex-col gap-[14px]">
          <AccountCard
            id="CT-98234"
            type="Live"
            server="cTrader-Live"
            balance="$4,800.00"
            equity="$4,920.00"
            freeMargin="$3,740.00"
            marginUsed="$1,180.00"
          />
          <AccountCard
            id="CT-54210"
            type="Demo"
            server="cTrader-Demo"
            balance="$10,000.00"
            equity="$10,000.00"
            freeMargin="$10,000.00"
            marginUsed="$0.00"
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function AccountCard({ id, type, server, balance, equity, freeMargin, marginUsed }: {
  id: string; type: string; server: string; balance: string; equity: string; freeMargin: string; marginUsed: string;
}) {
  return (
    <div className="flex flex-col rounded-[12px] bg-[var(--color-bg-card)] shadow-[0_2px_10px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="flex flex-col gap-[16px] p-[24px]">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Wallet size={18} className="text-[var(--color-accent-cta)]" />
            <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">{id}</span>
            <span className={`font-primary text-[12px] font-semibold px-[10px] py-[3px] rounded-full ${type === 'Live' ? 'bg-[#ECFDF5] text-[var(--color-success)]' : 'bg-[#F1F5F9] text-[var(--color-text-secondary)]'}`}>{type}</span>
          </div>
          <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">{server}</span>
        </div>
        <div className="h-[1px] bg-[var(--color-border-default)]" />
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px]">
          <Metric label="Balance" value={balance} />
          <Metric label="Equity" value={equity} />
          <Metric label="Free Margin" value={freeMargin} valueColor="var(--color-success)" />
          <Metric label="Margin Used" value={marginUsed} valueColor="var(--color-warning)" />
        </div>
      </div>
      {/* Bottom strip */}
      <div className="flex gap-[10px] bg-[var(--color-bg-canvas)] border-t border-[var(--color-border-default)] px-[24px] py-[12px] rounded-b-[12px]">
        <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Leverage: 1:100</span>
        <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Currency: USD</span>
      </div>
    </div>
  );
}

function Metric({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex flex-col gap-[4px] flex-1">
      <span className="font-primary text-[11px] text-[var(--color-text-secondary)]">{label}</span>
      <span className="font-primary text-[16px] font-bold" style={{ color: valueColor || 'var(--color-text-primary)' }}>{value}</span>
    </div>
  );
}
