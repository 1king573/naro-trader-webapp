import { useState } from 'react';
import { Clock3, CircleCheck, CircleX, ChartBar, Check, X, Loader2 } from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';

export function AdminApprovalsPage() {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const handleApprove = () => {
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      setShowApproveModal(false);
    }, 1500);
  };

  const handleReject = () => {
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      setShowRejectModal(false);
    }, 1500);
  };

  return (
    <AdminLayout title="Approvals Queue">
      <div className="flex flex-col gap-[24px]">
        {/* Stats Row */}
        <div className="flex gap-[16px]">
          <StatCard icon={<Clock3 size={20} />} value="3" label="Awaiting Approval" color="#F59E0B" />
          <StatCard icon={<CircleCheck size={20} />} value="12" label="Approved Today" color="#10B981" />
          <StatCard icon={<CircleX size={20} />} value="2" label="Rejected Today" color="#EF4444" />
          <StatCard icon={<ChartBar size={20} />} value="17" label="Total Requests Today" color="#0F172A" />
        </div>

        {/* Pending Section */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <span className="font-primary text-[18px] font-bold text-[#0F172A]">Pending Approval</span>
              <span className="flex items-center justify-center bg-[#EF4444] text-white font-primary text-[12px] font-bold rounded-full px-[10px] py-[3px]">3</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Clock3 size={14} className="text-[#94A3B8]" />
              <span className="font-primary text-[12px] text-[#94A3B8]">Auto-refreshes every 60 seconds</span>
            </div>
          </div>

          {/* Pending Cards */}
          <PendingCard
            name="Alice Johnson"
            email="alice@example.com"
            code="TRX-20260227-XY001"
            type="DEPOSIT"
            amount="$500.00"
            submitted="10 mins ago"
            onApprove={() => setShowApproveModal(true)}
            onReject={() => setShowRejectModal(true)}
          />
          <PendingCard
            name="Bob Smith"
            email="bob@example.com"
            code="TRX-20260227-XY002"
            type="WITHDRAWAL"
            amount="$200.00"
            submitted="25 mins ago"
            onApprove={() => setShowApproveModal(true)}
            onReject={() => setShowRejectModal(true)}
          />
          <PendingCard
            name="Carol Davis"
            email="carol@example.com"
            code="TRX-20260227-XY003"
            type="WALLET_TO_CTRADER"
            amount="$1,200.00"
            submitted="1 hour ago"
            onApprove={() => setShowApproveModal(true)}
            onReject={() => setShowRejectModal(true)}
          />
        </div>

        {/* Recently Processed */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[10px]">
            <span className="font-primary text-[16px] font-bold text-[#0F172A]">Recently Processed</span>
            <span className="font-primary text-[12px] font-medium text-[#64748B] bg-[#F1F5F9] rounded-full px-[10px] py-[4px]">Today</span>
          </div>

          <div className="flex flex-col rounded-[12px] bg-white border border-[#E2E8F0] overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center bg-[#F8FAFC] px-[20px] py-[12px]">
              <span className="w-[220px] font-primary text-[11px] font-semibold text-[#64748B] tracking-[0.5px]">REQUEST CODE</span>
              <span className="w-[200px] font-primary text-[11px] font-semibold text-[#64748B] tracking-[0.5px]">USER</span>
              <span className="w-[180px] font-primary text-[11px] font-semibold text-[#64748B] tracking-[0.5px]">TYPE</span>
              <span className="w-[140px] font-primary text-[11px] font-semibold text-[#64748B] tracking-[0.5px]">AMOUNT</span>
              <span className="w-[160px] font-primary text-[11px] font-semibold text-[#64748B] tracking-[0.5px]">STATUS</span>
              <span className="flex-1 font-primary text-[11px] font-semibold text-[#64748B] tracking-[0.5px]">PROCESSED AT</span>
            </div>

            <TableRow code="TRX-20260227-XY001" user="alice@example.com" type="DEPOSIT" amount="$500.00" status="Approved" statusColor="#10B981" statusBg="#ECFDF5" time="10:45 AM" />
            <TableRow code="TRX-20260227-XY002" user="bob@example.com" type="WITHDRAWAL" amount="$200.00" status="Rejected" statusColor="#EF4444" statusBg="#FEF2F2" time="9:22 AM" />
            <TableRow code="TRX-20260227-XY003" user="carol@example.com" type="WALLET_TO_CTRADER" amount="$1,200.00" status="Approved" statusColor="#10B981" statusBg="#ECFDF5" time="8:15 AM" />
            <TableRow code="TRX-20260227-XY004" user="dave@example.com" type="DEPOSIT" amount="$850.00" status="Approved" statusColor="#10B981" statusBg="#ECFDF5" time="7:50 AM" />
            <TableRow code="TRX-20260226-XY005" user="eve@example.com" type="WITHDRAWAL" amount="$325.00" status="Rejected" statusColor="#EF4444" statusBg="#FEF2F2" time="7:10 AM" />
          </div>

          <div className="flex justify-end">
            <span className="font-primary text-[13px] font-medium text-[var(--color-accent-cta)] cursor-pointer hover:underline">
              View all requests →
            </span>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <ModalOverlay>
          <div className="flex flex-col gap-[16px] rounded-[16px] bg-white p-[24px] w-[400px]">
            <div className="flex justify-center">
              <CircleCheck size={28} className="text-[var(--color-success)]" />
            </div>
            <span className="font-primary text-[24px] font-bold text-[var(--color-text-primary)] text-center">Approve this request?</span>
            <p className="font-primary text-[14px] text-[var(--color-text-secondary)] text-center leading-[1.4]">
              This will process the transaction and notify the user. This action cannot be undone.
            </p>
            <div className="flex gap-[12px]">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex items-center justify-center flex-1 h-[44px] rounded-[10px] border border-[var(--color-border-default)] font-primary text-[14px] font-semibold text-[var(--color-text-primary)] cursor-pointer hover:bg-[var(--color-bg-canvas)]"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={modalLoading}
                className="flex items-center justify-center gap-[8px] flex-1 h-[44px] rounded-[10px] bg-[var(--color-success)] text-white font-primary text-[14px] font-bold cursor-pointer hover:opacity-90 disabled:opacity-60"
              >
                {modalLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {modalLoading ? 'Approving...' : 'Approve'}
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <ModalOverlay>
          <div className="flex flex-col gap-[16px] rounded-[16px] bg-white p-[24px] w-[400px]">
            <div className="flex justify-center">
              <CircleX size={28} className="text-[var(--color-danger)]" />
            </div>
            <span className="font-primary text-[24px] font-bold text-[var(--color-text-primary)] text-center">Reject this request?</span>
            <p className="font-primary text-[14px] text-[var(--color-text-secondary)] text-center leading-[1.4]">
              This will reject the transaction and release any held funds. The user will be notified.
            </p>
            <textarea
              placeholder="Reason for rejection (optional)"
              className="w-full h-[80px] rounded-[8px] border border-[var(--color-border-default)] p-[12px] font-primary text-[13px] text-[var(--color-text-primary)] resize-none outline-none focus:border-[var(--color-accent-cta)]"
            />
            <div className="flex gap-[12px]">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex items-center justify-center flex-1 h-[44px] rounded-[10px] border border-[var(--color-border-default)] font-primary text-[14px] font-semibold text-[var(--color-text-primary)] cursor-pointer hover:bg-[var(--color-bg-canvas)]"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={modalLoading}
                className="flex items-center justify-center gap-[8px] flex-1 h-[44px] rounded-[10px] bg-[var(--color-danger)] text-white font-primary text-[14px] font-bold cursor-pointer hover:opacity-90 disabled:opacity-60"
              >
                {modalLoading ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                {modalLoading ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </AdminLayout>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col gap-[8px] flex-1 rounded-[10px] bg-white border border-[#E2E8F0] p-[16px_20px]">
      <span style={{ color }}>{icon}</span>
      <span className="font-primary text-[24px] font-bold" style={{ color }}>{value}</span>
      <span className="font-primary text-[13px] text-[#64748B]">{label}</span>
    </div>
  );
}

function PendingCard({ name, email, code, type, amount, submitted, onApprove, onReject }: {
  name: string; email: string; code: string; type: string; amount: string; submitted: string;
  onApprove: () => void; onReject: () => void;
}) {
  return (
    <div className="flex rounded-[12px] bg-white border border-[#FED7AA] overflow-hidden">
      <div className="w-[4px] bg-[#F59E0B] rounded-l-[12px] shrink-0" />
      <div className="flex flex-col gap-[14px] flex-1 p-[20px_24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <span className="font-primary text-[15px] font-bold text-[#0F172A]">{name}</span>
            <span className="font-primary text-[13px] text-[#64748B]">{email}</span>
          </div>
          <span className="font-primary text-[13px] font-bold text-[#0F172A]">{amount}</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <span className="font-mono text-[13px] text-[#64748B]">{code}</span>
          <span className="font-primary text-[12px] font-semibold text-[#0F172A]">{type}</span>
          <span className="font-primary text-[12px] text-[#94A3B8]">{submitted}</span>
        </div>
        <div className="flex gap-[8px] justify-end">
          <button
            onClick={onReject}
            className="flex items-center gap-[6px] rounded-[8px] border border-[#EF4444] px-[14px] py-[8px] font-primary text-[13px] font-semibold text-[#EF4444] cursor-pointer hover:bg-[#FEF2F2] transition-colors"
          >
            <X size={14} />
            Reject
          </button>
          <button
            onClick={onApprove}
            className="flex items-center gap-[6px] rounded-[8px] bg-[#10B981] px-[14px] py-[8px] font-primary text-[13px] font-bold text-white cursor-pointer hover:bg-[#059669] transition-colors"
          >
            <Check size={14} />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function TableRow({ code, user, type, amount, status, statusColor, statusBg, time }: {
  code: string; user: string; type: string; amount: string; status: string; statusColor: string; statusBg: string; time: string;
}) {
  return (
    <div className="flex items-center px-[20px] py-[12px] border-b border-[#E2E8F0]">
      <span className="w-[220px] font-mono text-[13px] font-medium text-[#0F172A]">{code}</span>
      <span className="w-[200px] font-primary text-[13px] text-[#64748B]">{user}</span>
      <span className="w-[180px] font-primary text-[13px] font-medium text-[#0F172A]">{type}</span>
      <span className="w-[140px] font-primary text-[13px] font-medium text-[#0F172A]">{amount}</span>
      <div className="w-[160px]">
        <span className="font-primary text-[12px] font-semibold rounded-full px-[10px] py-[4px]" style={{ backgroundColor: statusBg, color: statusColor }}>{status}</span>
      </div>
      <span className="flex-1 font-primary text-[13px] text-[#64748B]">{time}</span>
    </div>
  );
}

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {children}
    </div>
  );
}
