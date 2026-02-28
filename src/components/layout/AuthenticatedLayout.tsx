import { NavLink, useNavigate } from 'react-router-dom';
import {
  House,
  Wallet,
  ChartColumn,
  RefreshCw,
  User,
  LogOut,
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

  return (
    <div className="flex h-full w-full bg-[var(--color-bg-canvas)]">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between w-[240px] shrink-0 bg-[var(--color-brand-primary)] p-[20px_16px]">
        <div className="flex flex-col gap-[18px]">
          {/* Brand */}
          <div className="flex flex-col gap-[4px]">
            <span className="font-primary text-[16px] font-bold text-white">
              Naro Traders
            </span>
            <span className="font-primary text-[12px] text-[var(--color-text-secondary)]">
              Trade Smarter. Manage Easier.
            </span>
          </div>
          {/* Nav */}
          <nav className="flex flex-col gap-[8px] px-[8px]">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
        <header className="flex items-center justify-between h-[64px] px-[24px] bg-[var(--color-bg-card)] border-b border-[var(--color-border-default)] shrink-0">
          <h1 className="font-primary text-[18px] font-bold text-[var(--color-text-primary)]">
            {title}
          </h1>
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[var(--color-accent-cta)]">
              <span className="font-primary text-[13px] font-bold text-white">JT</span>
            </div>
            <span className="font-primary text-[14px] font-medium text-[var(--color-text-primary)]">
              John Trader
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-bg-canvas)] p-[24px]">
          {children}
        </main>
      </div>
    </div>
  );
}
