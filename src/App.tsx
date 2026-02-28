import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WalletPage } from './pages/WalletPage';
import { CTraderAccountsPage } from './pages/CTraderAccountsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { TransactionDetailPage } from './pages/TransactionDetailPage';
import { NewTransactionPage } from './pages/NewTransactionPage';
import { DepositWalletPage } from './pages/DepositWalletPage';
import { WalletToCTraderPage } from './pages/WalletToCTraderPage';
import { CTraderToWalletPage } from './pages/CTraderToWalletPage';
import { WalletWithdrawalPage } from './pages/WalletWithdrawalPage';
import { ProfilePage } from './pages/ProfilePage';
import { KycPage } from './pages/KycPage';
import { AdminApprovalsPage } from './pages/AdminApprovalsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Wallet */}
        <Route path="/wallet" element={<WalletPage />} />

        {/* cTrader Accounts */}
        <Route path="/ctrader-accounts" element={<CTraderAccountsPage />} />

        {/* Transactions */}
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/new" element={<NewTransactionPage />} />
        <Route path="/transactions/new/deposit-wallet" element={<DepositWalletPage />} />
        <Route path="/transactions/new/wallet-to-ctrader" element={<WalletToCTraderPage />} />
        <Route path="/transactions/new/ctrader-to-wallet" element={<CTraderToWalletPage />} />
        <Route path="/transactions/new/wallet-withdrawal" element={<WalletWithdrawalPage />} />
        <Route path="/transactions/:id" element={<TransactionDetailPage />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/kyc" element={<KycPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
