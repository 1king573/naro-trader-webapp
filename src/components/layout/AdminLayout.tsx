import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function AdminLayout({ title, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-[var(--color-bg-canvas)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Admin Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between w-[240px] shrink-0 bg-[#1E293B] p-[20px_16px] transition-transform md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col gap-[20px]">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[6px]">
              <span className="font-primary text-[16px] font-bold text-white">
                Naro Traders
              </span>
              <div className="flex items-center gap-[6px] bg-[#EF4444] rounded-full py-[3px] px-[10px] w-fit">
                <span className="font-primary text-[10px] font-bold text-white uppercase tracking-[1px]">
                  Admin Panel
                </span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white">
              <X size={20} />
            </button>
          </div>
          {/* Nav */}
          <nav className="flex flex-col gap-[4px]">
            <NavLink
              to="/admin/approvals"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-[10px] h-[38px] px-[12px] rounded-[8px] font-primary text-[14px] transition-colors ${
                  isActive
                    ? 'bg-[#334155] text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`
              }
            >
              <ShieldCheck size={18} />
              <span>Approvals</span>
            </NavLink>
          </nav>
        </div>
        {/* Bottom */}
        <div className="flex flex-col gap-[12px]">
          <div className="h-[1px] bg-[#334155]" />
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/admin/login')}
              className="flex items-center gap-[10px] text-[#94A3B8] hover:text-white font-primary text-[14px] transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between h-[64px] px-4 md:px-[24px] bg-white border-b border-[#E2E8F0] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[#0F172A]">
              <Menu size={22} />
            </button>
            <h1 className="font-primary text-[18px] font-bold text-[#0F172A]">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[6px] bg-[#1E293B] rounded-full py-[4px] px-[10px]">
              <ShieldCheck size={12} className="text-[#94A3B8]" />
              <span className="font-primary text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[1px]">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 md:p-[24px]">
          {children}
        </main>
      </div>
    </div>
  );
}
