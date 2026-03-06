import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleCheck, Loader2, ChevronDown } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function WalletWithdrawalPage() {
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
          <div className="flex items-center gap-[10px]">
            <span className="font-primary text-[22px] font-bold text-[#0F172A]">Withdraw to External Account</span>
            <span className="font-primary text-[12px] font-semibold text-[#EA580C] bg-[#FFF7ED] rounded-full px-[10px] py-[4px]">Wallet → External</span>
          </div>
          <p className="font-primary text-[14px] text-[#64748B] max-w-[620px]">Request a withdrawal from your wallet to your external payment method.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-[24px]">
          <div className="flex-1 min-w-0">
            {submitted ? (
              <div className="flex flex-col items-center gap-[16px] rounded-[12px] bg-white border border-[#E2E8F0] p-[32px]">
                <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#EA580C]">
                  <CircleCheck size={32} className="text-white" />
                </div>
                <span className="font-primary text-[20px] font-bold text-[var(--color-text-primary)]">Withdrawal Request Submitted!</span>
                <p className="font-primary text-[14px] text-[var(--color-text-secondary)] text-center max-w-[360px] leading-[1.4]">Your request is pending admin approval. Your funds are currently on hold.</p>
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
                  <label className="font-primary text-[13px] font-semibold text-[#0F172A]">Payment Method</label>
                  <div className="flex items-center justify-between h-[44px] rounded-[8px] border border-[#E2E8F0] px-[14px] cursor-pointer">
                    <span className="font-primary text-[14px] text-[#64748B]">Select method...</span>
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
                <div className="flex items-center gap-[8px] rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] p-[14px_16px]">
                  <span className="font-primary text-[13px] text-[#991B1B]">Withdrawals are final once processed. The amount will be held from your balance until approved. Compliance checks may apply.</span>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center gap-[8px] h-[48px] rounded-[8px] bg-[#EA580C] text-white font-primary text-[14px] font-bold cursor-pointer hover:bg-[#C2410C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Withdrawal Request'}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-[16px] w-full lg:w-[420px] lg:shrink-0">
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
              <div className="flex items-center justify-between"><span className="font-primary text-[14px] font-bold text-[#0F172A]">Wallet Summary</span></div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between">
                  <span className="font-primary text-[13px] text-[#64748B]">Available</span>
                  <span className="font-primary text-[14px] font-bold text-[#10B981]">$1,250.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-primary text-[13px] text-[#64748B]">On Hold</span>
                  <span className="font-primary text-[14px] font-bold text-[#F59E0B]">$300.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-primary text-[13px] text-[#64748B]">Total</span>
                  <span className="font-primary text-[14px] font-bold text-[#0F172A]">$1,550.00</span>
                </div>
              </div>
              <p className="font-primary text-[12px] text-[#64748B] italic">Projected amount updates in real time as you edit the withdrawal. Final settlement may vary after compliance checks.</p>
            </div>
            <div className="flex flex-col gap-[14px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
              <span className="font-primary text-[14px] font-bold text-[#EA580C]">What happens next</span>
              <div className="flex flex-col gap-[8px]">
                {['Amount held from your wallet', 'Admin reviews your withdrawal request', 'Once approved, funds sent to your payment method', 'Final settlement may vary after compliance checks'].map((s, i) => (
                  <div key={i} className="flex gap-[8px]">
                    <span className="font-primary text-[13px] text-[#EA580C]">{i + 1}.</span>
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
