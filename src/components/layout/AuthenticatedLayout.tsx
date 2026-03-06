import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  House,
  Wallet,
  ChartColumn,
  RefreshCw,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: House },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/ctrader-accounts', label: 'cTrader Accounts', icon: ChartColumn },
  { to: '/transactions', label: 'Transactions', icon: RefreshCw },
  { to: '/profile', label: 'Profile', icon: User },
];

interface AuthenticatedLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function AuthenticatedLayout({ title, children }: AuthenticatedLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-[var(--color-bg-canvas)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between w-[240px] shrink-0 bg-[var(--color-brand-primary)] p-[20px_16px] transition-transform md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col gap-[18px]">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[4px]">
              <span className="font-primary text-[16px] font-bold text-white">
                Naro Traders
              </span>
              <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">
                Trade Smarter. Manage Easier.
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white">
              <X size={20} />
            </button>
          </div>
          {/* Nav */}
          <nav className="flex flex-col gap-[8px] px-[8px]">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-[10px] h-[38px] px-[12px] rounded-[8px] font-primary text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[var(--color-accent-cta)] text-white font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Logout */}
        <div className="flex flex-col gap-[12px]">
          <div className="h-[1px] bg-[#1E293B]" />
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-[10px] h-[36px] px-[10px] text-[var(--color-text-secondary)] hover:text-white font-primary text-[14px] transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between h-[64px] px-4 md:px-[24px] bg-[var(--color-bg-card)] border-b border-[var(--color-border-default)] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[var(--color-text-primary)]">
              <Menu size={22} />
            </button>
            <h1 className="font-primary text-[18px] font-bold text-[var(--color-text-primary)]">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[var(--color-accent-cta)]">
              <span className="font-primary text-[13px] font-bold text-white">JT</span>
            </div>
            <span className="hidden sm:inline font-primary text-[14px] font-medium text-[var(--color-text-primary)]">
              John Trader
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-bg-canvas)] p-4 md:p-[24px]">
          {children}
        </main>
      </div>
    </div>
  );
}
