import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, CircleCheck, Loader2 } from 'lucide-react';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';

type KycStep = 1 | 2 | 'success';

export function KycPage() {
  const [step, setStep] = useState<KycStep>(1);

  return (
    <AuthenticatedLayout title="KYC Verification">
      <div className="flex flex-col gap-[24px]">
        {/* Back Link */}
        <Link to="/profile" className="font-primary text-[13px] text-[var(--color-accent-cta)]">
          ← Back to Profile
        </Link>

        {step === 'success' ? (
          <KycSuccess />
        ) : (
          <>
            {/* Page Header */}
            <div className="flex flex-col gap-[6px]">
              <span className="font-primary text-[22px] font-bold text-[#0F172A]">Identity Verification</span>
              <p className="font-primary text-[14px] text-[#64748B]">
                Complete both steps to verify your identity. Your documents are encrypted and stored securely.
              </p>
            </div>

            {/* Step Progress */}
            <div className="flex items-center justify-center gap-[0px] py-[16px]">
              <StepNode
                number={1}
                label="Identity Document"
                active={step === 1}
                completed={step === 2}
              />
              <div className="w-[120px] h-[2px] bg-[#E2E8F0]" />
              <StepNode
                number={2}
                label="Proof of Address"
                active={step === 2}
                completed={false}
              />
            </div>

            {/* Content */}
            {step === 1 ? (
              <Step1Content onNext={() => setStep(2)} />
            ) : (
              <Step2Content onSubmit={() => setStep('success')} />
            )}
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

function StepNode({ number, label, active, completed }: { number: number; label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[6px] w-[120px]">
      <div
        className={`flex items-center justify-center w-[32px] h-[32px] rounded-full font-primary text-[13px] font-bold ${
          completed
            ? 'bg-[var(--color-success)] text-white'
            : active
            ? 'bg-[var(--color-accent-cta)] text-white'
            : 'bg-[#F1F5F9] text-[var(--color-text-secondary)]'
        }`}
      >
        {completed ? <CircleCheck size={16} /> : number}
      </div>
      <span className={`font-primary text-[12px] text-center ${active || completed ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
        {label}
      </span>
    </div>
  );
}

function Step1Content({ onNext }: { onNext: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-[24px]">
      {/* Left - Upload */}
      <div className="flex flex-col gap-[16px] flex-1">
        <div className="flex flex-col gap-[16px] rounded-[12px] bg-white p-[28px] border border-[#E2E8F0]">
          <span className="font-primary text-[16px] font-bold text-[#0F172A]">Upload Identity Document</span>
          <div className="h-[1px] bg-[#E2E8F0]" />
          <p className="font-primary text-[13px] text-[#64748B]">
            Upload a clear photo of your government-issued ID (passport, driver's license, or national ID card).
          </p>

          <div className="flex flex-col sm:flex-row gap-[16px]">
            <UploadZone label="Front Side" />
            <UploadZone label="Back Side" />
          </div>

          <div className="flex gap-[12px]">
            <button
              onClick={handleContinue}
              disabled={loading}
              className="flex items-center justify-center gap-[8px] flex-1 h-[48px] rounded-[8px] bg-[var(--color-accent-cta)] text-white font-primary text-[14px] font-bold hover:bg-[#1D4ED8] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : 'Continue to Step 2'}
            </button>
          </div>
        </div>
      </div>

      {/* Right - Info Cards */}
      <div className="flex flex-col gap-[16px] w-full lg:w-[420px] lg:shrink-0">
        <InfoCard title="Why we need your ID" items={[
          'Regulatory compliance (KYC/AML)',
          'Protect your account from fraud',
          'Enable full platform features',
        ]} />
        <InfoCard title="Tips for a good upload" items={[
          'Ensure the document is fully visible',
          'Use good lighting, avoid shadows',
          'Make sure text is clearly readable',
        ]} />
        <div className="flex flex-col gap-[10px] rounded-[12px] bg-[#EFF6FF] border border-[#BFDBFE] p-[16px_20px]">
          <span className="font-primary text-[14px] font-bold text-[#1E40AF]">Privacy Notice</span>
          <p className="font-primary text-[13px] text-[#1D4ED8] leading-[1.5]">
            Your documents are encrypted and stored securely. They are only used for verification purposes and are never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step2Content({ onSubmit }: { onSubmit: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-[24px]">
      {/* Left - Upload */}
      <div className="flex flex-col gap-[16px] flex-1">
        <div className="flex flex-col gap-[16px] rounded-[12px] bg-white p-[28px] border border-[#E2E8F0]">
          <span className="font-primary text-[16px] font-bold text-[#0F172A]">Upload Proof of Address</span>
          <div className="h-[1px] bg-[#E2E8F0]" />
          <p className="font-primary text-[13px] text-[#64748B]">
            Upload a document showing your current address (utility bill, bank statement, or government letter dated within the last 3 months).
          </p>

          <div className="flex gap-[8px] flex-wrap">
            {['Utility Bill', 'Bank Statement', 'Government Letter'].map((t) => (
              <span key={t} className="font-primary text-[12px] text-[var(--color-accent-cta)] bg-[#EFF6FF] rounded-full px-[12px] py-[5px]">{t}</span>
            ))}
          </div>

          <UploadZone label="Address Document" />

          <div className="flex items-center gap-[8px] rounded-[8px] bg-[#FFF7ED] border border-[#FED7AA] p-[12px]">
            <span className="font-primary text-[13px] text-[#92400E]">
              Document must be dated within the last 3 months
            </span>
          </div>

          <div className="flex gap-[12px]">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center justify-center gap-[8px] flex-1 h-[48px] rounded-[8px] bg-[var(--color-accent-cta)] text-white font-primary text-[14px] font-bold hover:bg-[#1D4ED8] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit for Review'}
            </button>
          </div>
        </div>
      </div>

      {/* Right - Info Cards */}
      <div className="flex flex-col gap-[16px] w-full lg:w-[420px] lg:shrink-0">
        <InfoCard title="Why we need your ID" items={[
          'Regulatory compliance (KYC/AML)',
          'Protect your account from fraud',
          'Enable full platform features',
        ]} />
        <InfoCard title="Tips for a good upload" items={[
          'Ensure the document is fully visible',
          'Use good lighting, avoid shadows',
          'Make sure text is clearly readable',
        ]} />
        <div className="flex flex-col gap-[10px] rounded-[12px] bg-[#EFF6FF] border border-[#BFDBFE] p-[16px_20px]">
          <span className="font-primary text-[14px] font-bold text-[#1E40AF]">Privacy Notice</span>
          <p className="font-primary text-[13px] text-[#1D4ED8] leading-[1.5]">
            Your documents are encrypted and stored securely. They are only used for verification purposes and are never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

function KycSuccess() {
  return (
    <div className="flex items-center justify-center py-[40px]">
      <div className="flex flex-col items-center gap-[20px] max-w-[480px]">
        <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[var(--color-success)]">
          <CircleCheck size={36} className="text-white" />
        </div>
        <span className="font-primary text-[28px] font-bold text-[var(--color-text-primary)]">Verification Submitted</span>
        <p className="font-primary text-[15px] text-[var(--color-text-secondary)] text-center leading-[1.45]">
          Your documents have been submitted for review. You'll be notified once the verification is complete. This usually takes 1-2 business days.
        </p>
        <div className="flex items-center justify-center gap-[8px] bg-[var(--color-bg-canvas)] rounded-full border border-[var(--color-border-default)] px-[14px] py-[10px]">
          <span className="font-primary text-[13px] font-semibold text-[var(--color-warning)]">Pending Review</span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-[16px] py-[8px]">
          <StepDone label="Identity Document" />
          <StepDone label="Proof of Address" />
        </div>

        <div className="flex flex-col gap-[12px] w-[340px]">
          <Link
            to="/profile"
            className="flex items-center justify-center h-[48px] rounded-[10px] bg-[var(--color-accent-cta)] text-white font-primary text-[14px] font-bold hover:bg-[#1D4ED8] transition-colors"
          >
            Back to Profile
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-center h-[48px] rounded-[10px] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-primary text-[14px] font-semibold hover:bg-[var(--color-bg-canvas)] transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function StepDone({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[6px]">
      <CircleCheck size={16} className="text-[var(--color-success)]" />
      <span className="font-primary text-[13px] font-semibold text-[var(--color-text-primary)]">{label}</span>
    </div>
  );
}

function UploadZone({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[10px] flex-1 min-h-[140px] rounded-[10px] border-2 border-dashed border-[var(--color-border-default)] bg-[var(--color-bg-canvas)] p-[20px] cursor-pointer hover:border-[var(--color-accent-cta)] transition-colors">
      <Upload size={24} className="text-[var(--color-text-secondary)]" />
      <span className="font-primary text-[13px] font-semibold text-[var(--color-text-primary)]">{label}</span>
      <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">Click to upload or drag & drop</span>
      <span className="font-primary text-[11px] text-[var(--color-text-secondary)]">PNG, JPG up to 5MB</span>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-[10px] rounded-[12px] bg-white border border-[#E2E8F0] p-[20px]">
      <span className="font-primary text-[14px] font-bold text-[#0F172A]">{title}</span>
      <ul className="flex flex-col gap-[8px]">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-[8px]">
            <span className="font-primary text-[13px] text-[var(--color-accent-cta)] mt-[2px]">•</span>
            <span className="font-primary text-[13px] text-[#64748B] leading-[1.5]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
