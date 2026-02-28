import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

const sampleTransactions = [
  { code: 'TRX-20260227-ABC123', type: 'Deposit', typeColor: '#10B981', typeBg: '#ECFDF5', amount: '$300.00', status: 'Pending', statusColor: '#92400E', statusBg: '#FFF7ED', date: 'Feb 27, 2026', actions: 'View' },
  { code: 'TRX-20260226-DEF456', type: 'Wallet → cTrader', typeColor: '#2563EB', typeBg: '#EFF6FF', amount: '$500.00', status: 'Approved', statusColor: '#10B981', statusBg: '#ECFDF5', date: 'Feb 26, 2026', actions: 'View' },
  { code: 'TRX-20260225-GHI789', type: 'cTrader → Wallet', typeColor: '#7C3AED', typeBg: '#F5F3FF', amount: '$200.00', status: 'Approved', statusColor: '#10B981', statusBg: '#ECFDF5', date: 'Feb 25, 2026', actions: 'View' },
  { code: 'TRX-20260224-JKL012', type: 'Withdrawal', typeColor: '#EA580C', typeBg: '#FFF7ED', amount: '$150.00', status: 'Rejected', statusColor: '#EF4444', statusBg: '#FEF2F2', date: 'Feb 24, 2026', actions: 'View' },
  { code: 'TRX-20260223-MNO345', type: 'Deposit', typeColor: '#10B981', typeBg: '#ECFDF5', amount: '$1,000.00', status: 'Approved', statusColor: '#10B981', statusBg: '#ECFDF5', date: 'Feb 23, 2026', actions: 'View' },
  { code: 'TRX-20260222-PQR678', type: 'Wallet → cTrader', typeColor: '#2563EB', typeBg: '#EFF6FF', amount: '$750.00', status: 'Pending', statusColor: '#92400E', statusBg: '#FFF7ED', date: 'Feb 22, 2026', actions: 'View' },
  { code: 'TRX-20260221-STU901', type: 'Withdrawal', typeColor: '#EA580C', typeBg: '#FFF7ED', amount: '$250.00', status: 'Approved', statusColor: '#10B981', statusBg: '#ECFDF5', date: 'Feb 21, 2026', actions: 'View' },
  { code: 'TRX-20260220-VWX234', type: 'Deposit', typeColor: '#10B981', typeBg: '#ECFDF5', amount: '$2,000.00', status: 'Approved', statusColor: '#10B981', statusBg: '#ECFDF5', date: 'Feb 20, 2026', actions: 'View' },
];

export function TransactionsPage() {
  const [statusFilter] = useState('All Statuses');
  const [typeFilter] = useState('All Types');

  return (
    <AuthenticatedLayout title="Transactions">
      <div className="flex flex-col gap-[16px]">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <span className="font-primary text-[20px] font-bold text-[var(--color-text-primary)]">Transaction History</span>
            <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">All your funding and withdrawal requests</span>
          </div>
          <Link
            to="/transactions/new"
            className="flex items-center gap-[8px] bg-[var(--color-accent-cta)] text-white rounded-[8px] px-[20px] py-[10px] font-primary text-[14px] font-bold hover:bg-[#1D4ED8] transition-colors"
          >
            <Plus size={16} />
            <span>New Request</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-[10px] rounded-[10px] bg-[var(--color-bg-card)] border border-[var(--color-border-default)] p-[16px_20px]">
          <div className="flex gap-[12px]">
            <FilterDropdown label={statusFilter} />
            <FilterDropdown label={typeFilter} />
            <div className="flex items-center gap-[8px] flex-1 h-[40px] rounded-[8px] bg-[var(--color-bg-card)] border border-[var(--color-border-default)] px-[12px]">
              <Search size={16} className="text-[var(--color-text-secondary)]" />
              <span className="font-primary text-[13px] text-[var(--color-text-secondary)]">Search by code or amount...</span>
            </div>
          </div>
          <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Showing 24 results</span>
        </div>

        {/* Table */}
        <div className="flex flex-col rounded-[12px] bg-[var(--color-bg-card)] border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center bg-[var(--color-bg-canvas)] px-[20px] py-[12px] border-b border-[var(--color-border-default)]">
            <span className="w-[260px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)] tracking-[0.5px]">REQUEST CODE</span>
            <span className="w-[220px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)] tracking-[0.5px]">TYPE</span>
            <span className="w-[170px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)] tracking-[0.5px] text-right">AMOUNT</span>
            <span className="w-[200px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)] tracking-[0.5px]">STATUS</span>
            <span className="w-[170px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)] tracking-[0.5px]">DATE</span>
            <span className="w-[120px] font-primary text-[12px] font-semibold text-[var(--color-text-secondary)] tracking-[0.5px] text-center">ACTIONS</span>
          </div>

          {/* Rows */}
          {sampleTransactions.map((tx) => (
            <div key={tx.code} className="flex items-center h-[64px] px-[20px] py-[14px] border-b border-[var(--color-border-default)]">
              <span className="w-[260px] font-primary text-[13px] font-medium text-[var(--color-text-primary)]">{tx.code}</span>
              <div className="w-[220px]">
                <span className="font-primary text-[12px] font-semibold px-[10px] py-[4px] rounded-full" style={{ backgroundColor: tx.typeBg, color: tx.typeColor }}>{tx.type}</span>
              </div>
              <span className="w-[170px] font-primary text-[14px] font-bold text-[var(--color-text-primary)] text-right">{tx.amount}</span>
              <div className="w-[200px]">
                <span className="font-primary text-[12px] font-semibold px-[10px] py-[4px] rounded-full" style={{ backgroundColor: tx.statusBg, color: tx.statusColor }}>{tx.status}</span>
              </div>
              <span className="w-[170px] font-primary text-[13px] text-[var(--color-text-secondary)]">{tx.date}</span>
              <div className="w-[120px] text-center">
                <Link to={`/transactions/${tx.code}`} className="font-primary text-[13px] font-medium text-[var(--color-accent-cta)] hover:underline">View</Link>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between px-[20px] py-[16px] border-t border-[#E2E8F0]">
            <span className="font-primary text-[13px] text-[#666666]">Showing 1-10 of 24 results</span>
            <div className="flex items-center gap-[8px]">
              <button className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-canvas)] cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <span className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] bg-[var(--color-accent-cta)] text-white font-primary text-[13px] font-bold">1</span>
              <span className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] font-primary text-[13px] cursor-pointer hover:bg-[var(--color-bg-canvas)]">2</span>
              <span className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] font-primary text-[13px] cursor-pointer hover:bg-[var(--color-bg-canvas)]">3</span>
              <button className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-canvas)] cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between h-[40px] rounded-[8px] bg-[var(--color-bg-card)] border border-[var(--color-border-default)] px-[12px] min-w-[160px] cursor-pointer">
      <span className="font-primary text-[13px] text-[var(--color-text-primary)]">{label}</span>
      <ChevronDown size={16} className="text-[var(--color-text-secondary)]" />
    </div>
  );
}
