import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleCheck, Loader2, ChevronDown } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function WalletToCTraderPage() {
  const [account] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <AuthenticatedLayout title="New Request">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <Link to="/transactions/new" className="flex items-center gap-[6px] font-primary text-[13px] font-medium text-[var(--color-accent-cta)]">
            <ArrowLeft size={14} /> Back to New Request
          </Link>
          <p className="font-primary text-[14px] text-[#64748B] max-w-[620px]">Transfer funds from your wallet to your cTrader trading account.</p>
          <div className="flex items-center gap-[10px]">
            <span className="font-primary text-[22px] font-bold text-[#0F172A]">Fund cTrader Account</span>
            <span className="font-primary text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] rounded-full px-[10px] py-[4px]">Wallet → cTrader</span>
          </div>
        </div>

        <div className="flex gap-[24px]">
          <div className="flex-1 min-w-0">
            {submitted ? (
              <div className="flex flex-col items-center gap-[16px] rounded-[12px] bg-white border border-[#E2E8F0] p-[32px]">
                <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#2563EB]">
                  <CircleCheck size={32} className="text-white" />
                </div>
                <span className="font-primary text-[20px] font-bold text-[var(--color-text-primary)]">Funding Request Submitted!</span>
                <p className="font-primary text-[14px] text-[var(--color-text-secondary)] text-center max-w-[360px] leading-[1.4]">Your request is pending admin approval. The amount has been placed on hold in your wallet.</p>
                <span className="font-primary text-[13px] font-semibold text-[var(--color-warning)] bg-[var(--color-bg-canvas)] border border-[var(--color-border-default)] rounded-full px-[12px] py-[8px]">Pending Approval</span>
                <span className="font-primary text-[12px] font-semibold text-[#92400E] bg-[#FFF7ED] rounded-full px-[10px] py-[6px]">Amount on hold</span>
                <div className="flex flex-col gap-[10px] w-[320px]">
                  <Link to="/transactions" className="flex items-center justify-center h-[44px] rounded-[10px] bg-[var(--color-accent-cta)] text-white font-primary text-[14px] font-bold">View Request Details</Link>
                  <Link to="/transactions/new" className="flex items-center justify-center h-[44px] rounded-[10px] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-primary text-[14px] font-semibold">Back to Transactions</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] rounded-[12px] bg-white border border-[#E2E8F0] p-[28px]">
                <span className="font-primary text-[16px] font-bold text-[#0F172A]">Request Details</span>
                <div className="h-[1px] bg-[#E2E8F0]" />
                <div className="flex flex-col gap-[8px]">
                  <label className="font-primary text-[13px] font-semibold text-[#0F172A]">cTrader Account</label>
                  <div className="flex items-center justify-between h-[44px] rounded-[8px] border border-[#E2E8F0] px-[14px] cursor-pointer">
                    <span className="font-primary text-[14px] text-[#64748B]">{account || 'Select account...'}</span>
                    <ChevronDown size={16} className="text-[#94A3B8]" />
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label className="font-primary text-[13px] font-semibold text-[#0F172A]">Amount (USD)</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="h-[44px] rounded-[8px] border border-[#E2E8F0] px-[14px] font-primary text-[14px] text-[#0F172A] outline-none focus:border-[var(--color-accent-cta)]" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label className="font-primary text-[13px] font-semibold text-[#0F172A]">Note (optional)</label>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any additional details..." rows={3} className="rounded-[8px] border border-[#E2E8F0] px-[14px] py-[10px] font-primary text-[14px] text-[#0F172A] outline-none resize-none focus:border-[var(--color-accent-cta)]" />
                </div>
                <div className="flex items-center gap-[8px] rounded-[8px] bg-[#FFF7ED] border border-[#FED7AA] p-[12px_16px]">
                  <span className="font-primary text-[13px] text-[#92400E]">The amount will be held from your available balance until approved or cancelled.</span>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center gap-[8px] h-[48px] rounded-[8px] bg-[#2563EB] text-white font-primary text-[14px] font-bold cursor-pointer hover:bg-[#1D4ED8] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Funding Request'}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-[16px] w-[420px] shrink-0">
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
              <div className="flex items-center justify-between"><span className="font-primary text-[14px] font-bold text-[#0F172A]">Wallet Summary</span></div>
              <div className="flex flex-col gap-[10px]">
                <SummaryRow label="Available" value="$1,250.00" color="#10B981" />
                <SummaryRow label="On Hold" value="$300.00" color="#F59E0B" />
                <SummaryRow label="Total" value="$1,550.00" color="#0F172A" />
              </div>
              <p className="font-primary text-[12px] text-[#64748B] italic">Balances update every few minutes and may differ while transfers are processing.</p>
            </div>
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
              <span className="font-primary text-[14px] font-bold text-[#0F172A]">What happens next</span>
              <div className="flex flex-col gap-[8px]">
                {['Amount held from wallet balance', 'Admin reviews and approves', 'Funds transferred to cTrader account'].map((s, i) => (
                  <div key={i} className="flex gap-[8px]">
                    <span className="font-primary text-[13px] text-[var(--color-accent-cta)]">{i + 1}.</span>
                    <span className="font-primary text-[13px] text-[#64748B] leading-[1.5]">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function SummaryRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-primary text-[13px] text-[#64748B]">{label}</span>
      <span className="font-primary text-[14px] font-bold" style={{ color }}>{value}</span>
    </div>
  );
}
