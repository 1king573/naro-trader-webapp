import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleCheck, Loader2 } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function DepositWalletPage() {
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
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
          <p className="font-primary text-[14px] text-[#64748B] max-w-[620px]">
            Submit your deposit request with your payment reference. An admin will verify and approve.
          </p>
          <div className="flex items-center gap-[10px]">
            <span className="font-primary text-[22px] font-bold text-[#0F172A]">Deposit to Wallet</span>
            <span className="font-primary text-[12px] font-semibold text-[#10B981] bg-[#ECFDF5] rounded-full px-[10px] py-[4px]">External → Wallet</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[24px]">
          {/* Left - Form or Success */}
          <div className="flex-1 min-w-0">
            {submitted ? (
              <SuccessCard
                color="#10B981"
                title="Request Submitted!"
                description="Your deposit request has been sent and is pending admin approval. You can track status from request details."
              />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] rounded-[12px] bg-white border border-[#E2E8F0] p-[28px]">
                <span className="font-primary text-[16px] font-bold text-[#0F172A]">Request Details</span>
                <div className="h-[1px] bg-[#E2E8F0]" />
                <Field label="Amount (USD)" value={amount} onChange={setAmount} placeholder="0.00" type="number" />
                <Field label="Payment Reference" value={reference} onChange={setReference} placeholder="e.g. Bank transfer ref #" />
                <FieldTextarea label="Note (optional)" value={note} onChange={setNote} placeholder="Any additional details..." />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-[8px] h-[48px] rounded-[8px] bg-[#10B981] text-white font-primary text-[14px] font-bold cursor-pointer hover:bg-[#059669] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Deposit Request'}
                </button>
              </form>
            )}
          </div>

          {/* Right - Info Cards */}
          <div className="flex flex-col gap-[16px] w-full lg:w-[420px] lg:shrink-0">
            <StepsCard title="How deposits work" steps={[
              { num: '1', text: 'Submit your deposit request with amount and payment reference' },
              { num: '2', text: 'An admin reviews and verifies your payment' },
              { num: '3', text: 'Once approved, funds are credited to your wallet' },
            ]} />
            <NoticeCard items={[
              'Deposits typically process within 1 business day',
              'Include the correct reference for faster processing',
              'Contact support if your deposit is not reflected after 48 hours',
            ]} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function SuccessCard({ color, title, description }: { color: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-[16px] rounded-[12px] bg-white border border-[#E2E8F0] p-[32px]">
      <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full" style={{ backgroundColor: color }}>
        <CircleCheck size={32} className="text-white" />
      </div>
      <span className="font-primary text-[20px] font-bold text-[var(--color-text-primary)]">{title}</span>
      <p className="font-primary text-[14px] text-[var(--color-text-secondary)] text-center max-w-[360px] leading-[1.4]">{description}</p>
      <span className="font-primary text-[13px] font-semibold text-[var(--color-warning)] bg-[var(--color-bg-canvas)] border border-[var(--color-border-default)] rounded-full px-[12px] py-[8px]">
        Pending Approval
      </span>
      <div className="flex flex-col gap-[10px] w-[320px]">
        <Link to="/transactions" className="flex items-center justify-center h-[44px] rounded-[10px] bg-[var(--color-accent-cta)] text-white font-primary text-[14px] font-bold">
          View Request Details
        </Link>
        <Link to="/transactions/new" className="flex items-center justify-center h-[44px] rounded-[10px] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-primary text-[14px] font-semibold">
          Back to Transactions
        </Link>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-primary text-[13px] font-semibold text-[#0F172A]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[44px] rounded-[8px] border border-[#E2E8F0] px-[14px] font-primary text-[14px] text-[#0F172A] outline-none focus:border-[var(--color-accent-cta)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
      />
    </div>
  );
}

function FieldTextarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-primary text-[13px] font-semibold text-[#0F172A]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="rounded-[8px] border border-[#E2E8F0] px-[14px] py-[10px] font-primary text-[14px] text-[#0F172A] outline-none resize-none focus:border-[var(--color-accent-cta)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
      />
    </div>
  );
}

function StepsCard({ title, steps }: { title: string; steps: { num: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-[14px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
      <span className="font-primary text-[14px] font-bold text-[#0F172A]">{title}</span>
      {steps.map((s, i) => (
        <div key={i} className="flex gap-[10px]">
          <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#EFF6FF] shrink-0">
            <span className="font-primary text-[12px] font-bold text-[var(--color-accent-cta)]">{s.num}</span>
          </div>
          <span className="font-primary text-[13px] text-[#64748B] leading-[1.5]">{s.text}</span>
        </div>
      ))}
    </div>
  );
}

function NoticeCard({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-[10px] rounded-[12px] bg-[#FFF7ED] border border-[#FED7AA] p-[20px]">
      <span className="font-primary text-[14px] font-bold text-[#92400E]">Important</span>
      {items.map((item, i) => (
        <div key={i} className="flex gap-[8px]">
          <span className="font-primary text-[13px] text-[#92400E]">•</span>
          <span className="font-primary text-[13px] text-[#92400E] leading-[1.5]">{item}</span>
        </div>
      ))}
    </div>
  );
}
