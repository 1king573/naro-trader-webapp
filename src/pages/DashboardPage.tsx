import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowLeft, Landmark } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function DashboardPage() {
  return (
    <AuthenticatedLayout title="Dashboard">
      <div className="flex flex-col lg:flex-row gap-[16px]">
        {/* Main Column */}
        <div className="flex flex-col gap-[16px] flex-1 min-w-0">
          {/* Wallet Cards */}
          <div className="flex flex-col sm:flex-row gap-[14px]">
            <WalletCard label="AVAILABLE" value="$1,250.00" color="var(--color-success)" badgeText="+ $200 today" />
            <WalletCard label="ON HOLD" value="$320.00" color="var(--color-warning)" badgeText="2 pending" />
            <WalletCard label="TOTAL" value="$1,570.00" color="var(--color-text-primary)" badgeText="All accounts" />
          </div>

          {/* Pending Banner */}
          <div className="flex items-center justify-between rounded-[8px] bg-[#FFF7ED] border border-[#FED7AA] px-[16px] py-[12px]">
            <span className="font-primary text-[14px] text-[#92400E]">
              You have 2 pending requests awaiting admin approval
            </span>
            <Link to="/transactions" className="font-primary text-[14px] font-medium text-[var(--color-accent-cta)]">
              View all
            </Link>
          </div>

          {/* cTrader Accounts */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">cTrader Accounts</span>
              <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Last synced: 5 mins ago</span>
            </div>
            <div className="flex flex-col gap-[10px]">
              <CTraderAccountCard id="CT-98234" type="Live" balance="$4,800.00" equity="$4,920.00" />
              <CTraderAccountCard id="CT-54210" type="Demo" balance="$10,000.00" equity="$10,000.00" />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="flex flex-col gap-[16px] bg-[var(--color-bg-card)] rounded-[0px] border border-[var(--color-border-default)] p-[28px]">
            <div className="flex items-center justify-between">
              <span className="font-primary text-[16px] font-bold text-[var(--color-text-primary)]">Recent Transactions</span>
              <Link to="/transactions" className="font-primary text-[13px] font-medium text-[var(--color-accent-cta)]">View all</Link>
            </div>
            <div className="overflow-x-auto"><div className="flex flex-col min-w-[600px]">
              {/* Header */}
              <div className="flex items-center py-[14px] text-[var(--color-text-secondary)] font-primary text-[12px] font-semibold">
                <span className="w-[200px]">REQUEST CODE</span>
                <span className="w-[160px]">TYPE</span>
                <span className="w-[120px] text-right">AMOUNT</span>
                <span className="w-[120px] text-center">STATUS</span>
              </div>
              <div className="h-[1px] bg-[var(--color-border-default)]" />
              <TransactionRow code="TRX-20260227-ABC" type="Deposit" amount="$300.00" status="Pending" />
              <div className="h-[1px] bg-[var(--color-border-default)]" />
              <TransactionRow code="TRX-20260226-XYZ" type="Withdrawal" amount="$150.00" status="Approved" />
            </div></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-[10px] w-full lg:w-[200px] lg:shrink-0">
          <QuickAction label="Deposit to Wallet" color="var(--color-success)" icon={<ArrowDown size={18} />} to="/transactions/new/deposit-wallet" />
          <QuickAction label="Fund cTrader" color="var(--color-accent-cta)" icon={<ArrowRight size={18} />} to="/transactions/new/wallet-to-ctrader" />
          <QuickAction label="Withdraw to Wallet" color="#7C3AED" icon={<ArrowLeft size={18} />} to="/transactions/new/ctrader-to-wallet" />
          <QuickAction label="External Withdrawal" color="#EA580C" icon={<Landmark size={18} />} to="/transactions/new/wallet-withdrawal" />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function WalletCard({ label, value, color, badgeText }: { label: string; value: string; color: string; badgeText: string }) {
  return (
    <div className="flex flex-col gap-[10px] flex-1 rounded-[12px] bg-[var(--color-bg-card)] p-[28px_20px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <span className="font-primary text-[12px] font-semibold text-[var(--color-text-secondary)]">{label}</span>
      <span className="font-primary text-[28px] font-bold" style={{ color }}>{value}</span>
      <span className="font-primary text-[12px] text-[var(--color-accent-cta)] bg-[#EFF6FF] rounded-full px-[10px] py-[4px] w-fit">{badgeText}</span>
    </div>
  );
}

function CTraderAccountCard({ id, type, balance, equity }: { id: string; type: string; balance: string; equity: string }) {
  return (
    <div className="flex flex-col gap-[12px] rounded-[12px] bg-[var(--color-bg-card)] p-[16px_20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <span className="font-primary text-[14px] font-bold text-[var(--color-text-primary)]">{id}</span>
        <span className={`font-primary text-[12px] font-semibold px-[10px] py-[3px] rounded-full ${type === 'Live' ? 'bg-[#ECFDF5] text-[var(--color-success)]' : 'bg-[#F1F5F9] text-[var(--color-text-secondary)]'}`}>{type}</span>
      </div>
      <div className="flex gap-[20px]">
        <div className="flex flex-col gap-[2px]">
          <span className="font-primary text-[11px] text-[var(--color-text-secondary)]">Balance</span>
          <span className="font-primary text-[14px] font-semibold text-[var(--color-text-primary)]">{balance}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="font-primary text-[11px] text-[var(--color-text-secondary)]">Equity</span>
          <span className="font-primary text-[14px] font-semibold text-[var(--color-text-primary)]">{equity}</span>
        </div>
      </div>
    </div>
  );
}

function TransactionRow({ code, type, amount, status }: { code: string; type: string; amount: string; status: string }) {
  const statusColors: Record<string, string> = {
    Pending: 'bg-[#FFF7ED] text-[#92400E]',
    Approved: 'bg-[#ECFDF5] text-[var(--color-success)]',
    Rejected: 'bg-[var(--color-error-bg)] text-[var(--color-danger)]',
  };

  return (
    <div className="flex items-center py-[14px]">
      <span className="w-[200px] font-primary text-[13px] text-[var(--color-text-primary)]">{code}</span>
      <span className="w-[160px] font-primary text-[13px] text-[var(--color-text-secondary)]">{type}</span>
      <span className="w-[120px] font-primary text-[13px] font-semibold text-[var(--color-text-primary)] text-right">{amount}</span>
      <div className="w-[120px] flex justify-center">
        <span className={`font-primary text-[12px] font-semibold px-[10px] py-[4px] rounded-full ${statusColors[status] || ''}`}>{status}</span>
      </div>
    </div>
  );
}

function QuickAction({ label, color, icon, to }: { label: string; color: string; icon: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center gap-[8px] h-[44px] rounded-[10px] border font-primary text-[13px] font-semibold transition-colors"
      style={{ borderColor: color, color }}
    >
      <span>{label}</span>
      {icon}
    </Link>
  );
}
