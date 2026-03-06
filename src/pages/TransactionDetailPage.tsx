import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, X, TriangleAlert, Loader2 } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

export function TransactionDetailPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleCancel = () => {
    setCancelLoading(true);
    setTimeout(() => {
      setCancelLoading(false);
      setShowCancelModal(false);
    }, 1500);
  };

  return (
    <AuthenticatedLayout title="Transaction Details">
      <div className="flex flex-col gap-[16px]">
        {/* Back + Title */}
        <div className="flex flex-col gap-[8px]">
          <Link to="/transactions" className="flex items-center gap-[6px] font-primary text-[13px] font-medium text-[var(--color-accent-cta)]">
            <ArrowLeft size={14} />
            Back to Transactions
          </Link>
          <div className="flex items-center gap-[10px]">
            <span className="font-primary text-[20px] font-bold text-[#0F172A]">Transaction Details</span>
            <span className="font-mono text-[14px] font-medium text-[#64748B]">TRX-20260227-ABC123</span>
          </div>
        </div>

        {/* Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[14px] rounded-[12px] bg-[#FFF7ED] border border-[#FED7AA] px-[20px] py-[18px]">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#FDE68A] shrink-0">
              <Clock3 size={20} className="text-[#F59E0B]" />
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="font-primary text-[18px] font-bold text-[#92400E]">Pending Approval</span>
              <span className="font-primary text-[13px] text-[#B45309]">Awaiting review by an admin. You can cancel this request.</span>
            </div>
          </div>
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex items-center justify-center gap-[8px] rounded-[8px] border border-[#EF4444] px-[14px] py-[10px] font-primary text-[13px] font-semibold text-[#EF4444] cursor-pointer hover:bg-[#FEF2F2] transition-colors shrink-0 w-full sm:w-auto"
          >
            <X size={14} />
            Cancel Request
          </button>
        </div>

        {/* Two Column */}
        <div className="flex flex-col lg:flex-row gap-[20px]">
          {/* Left - Request Info */}
          <div className="flex flex-col flex-1 rounded-[12px] bg-white border border-[#E2E8F0] p-[24px]">
            <span className="font-primary text-[16px] font-bold text-[#0F172A]">Request Information</span>
            <div className="h-[1px] bg-[#E2E8F0] my-[14px]" />
            <InfoRow label="Request Code" value="TRX-20260227-ABC123" mono />
            <InfoRow label="Request Type" badge="Wallet → cTrader" badgeColor="#2563EB" badgeBg="#EFF6FF" />
            <InfoRow label="Amount" value="$300.00 USD" valueColor="#10B981" bold />
            <InfoRow label="Status" badge="Pending" badgeColor="#92400E" badgeBg="#FFF7ED" />
            <InfoRow label="Submitted On" value="Feb 27, 2026 at 10:32 AM" />
            <div className="flex justify-between py-[12px]">
              <span className="font-primary text-[13px] text-[#64748B]">Your Note</span>
              <span className="font-primary text-[13px] text-[#64748B] italic">Please prioritize if possible.</span>
            </div>
            <InfoRow label="cTrader Account" value="CT-98234 (Live)" />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[16px] w-full lg:w-[420px] lg:shrink-0">
            {/* Amount Summary */}
            <div className="flex flex-col gap-[12px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
              <span className="font-primary text-[14px] font-bold text-[#0F172A]">Amount Summary</span>
              <div className="flex justify-between">
                <span className="font-primary text-[13px] text-[#64748B]">Transfer Amount</span>
                <span className="font-primary text-[13px] text-[#0F172A]">$300.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-primary text-[13px] text-[#64748B]">Processing Fee</span>
                <span className="font-primary text-[13px] text-[#0F172A]">$0.00</span>
              </div>
              <div className="h-[1px] bg-[#E2E8F0]" />
              <div className="flex flex-col items-center gap-[4px] py-[10px]">
                <span className="font-primary text-[28px] font-bold text-[var(--color-success)]">$300.00</span>
                <span className="font-primary text-[12px] text-[#64748B]">Total Amount</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-[12px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
              <span className="font-primary text-[14px] font-bold text-[#0F172A]">Timeline</span>
              <div className="flex flex-col gap-[12px]">
                <TimelineStep color="#10B981" title="Request Created" time="Feb 27, 10:32 AM" />
                <TimelineStep color="#F59E0B" title="Pending Approval" time="Waiting for admin" />
                <TimelineStep color="#E2E8F0" title="Admin Review" time="Not yet" />
                <TimelineStep color="#E2E8F0" title="Funds Transferred" time="Not yet" last />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-[16px] rounded-[16px] bg-white p-[24px] w-full max-w-[400px] mx-4">
            <TriangleAlert size={28} className="text-[var(--color-warning)]" />
            <span className="font-primary text-[24px] font-bold text-[var(--color-text-primary)] text-center">Cancel this request?</span>
            <p className="font-primary text-[14px] text-[var(--color-text-secondary)] text-center leading-[1.4]">
              This action will cancel your transaction request and release any hold placed for processing.
            </p>
            <div className="flex gap-[12px] w-full">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex items-center justify-center flex-1 h-[44px] rounded-[10px] border border-[var(--color-border-default)] font-primary text-[14px] font-semibold text-[var(--color-text-primary)] cursor-pointer"
              >
                Keep Request
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelLoading}
                className="flex items-center justify-center gap-[8px] flex-1 h-[44px] rounded-[10px] bg-[var(--color-danger)] text-white font-primary text-[14px] font-bold cursor-pointer disabled:opacity-60"
              >
                {cancelLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                {cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}

function InfoRow({ label, value, valueColor, bold, mono, badge, badgeColor, badgeBg }: {
  label: string; value?: string; valueColor?: string; bold?: boolean; mono?: boolean;
  badge?: string; badgeColor?: string; badgeBg?: string;
}) {
  return (
    <div className="flex items-center justify-between py-[12px] border-b border-[#F1F5F9]">
      <span className="font-primary text-[13px] text-[#64748B]">{label}</span>
      {badge ? (
        <span className="font-primary text-[12px] font-semibold rounded-full px-[10px] py-[5px]" style={{ backgroundColor: badgeBg, color: badgeColor }}>{badge}</span>
      ) : (
        <span className={`${mono ? 'font-mono' : 'font-primary'} text-[14px] ${bold ? 'font-bold' : 'font-bold'}`} style={{ color: valueColor || '#0F172A' }}>{value}</span>
      )}
    </div>
  );
}

function TimelineStep({ color, title, time, last }: { color: string; title: string; time: string; last?: boolean }) {
  return (
    <div className="flex gap-[12px]">
      <div className="flex flex-col items-center">
        <div className="w-[12px] h-[12px] rounded-full mt-[3px] shrink-0" style={{ backgroundColor: color }} />
        {!last && <div className="w-[2px] flex-1 min-h-[24px] bg-[#E2E8F0]" />}
      </div>
      <div className="flex flex-col gap-[2px] pb-[12px]">
        <span className="font-primary text-[13px] font-semibold text-[#0F172A]">{title}</span>
        <span className="font-primary text-[12px] text-[#64748B]">{time}</span>
      </div>
    </div>
  );
}
