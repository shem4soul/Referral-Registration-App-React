"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  Wifi,
  Eye,
  EyeOff,
  Settings,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Tv,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePayment } from "./PaymentContext";
import { PaymentFlow } from "./PaymentFlow";
import { MdDashboard } from "react-icons/md";
import { useGetUserWalletBalance } from "@/apis/auth";
import WalletCreationModal from "../WalletCreationModal";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils";
import { IoBulbOutline, IoCheckmark, IoCopyOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import PinCreationModal from "../PinCreationModal";
import { useGetTransactions } from "@/apis/utility";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  unique_id: string;
  amount: string;
  description: string;
  side: "credit" | "debit";
  createdAt: string;
  purpose?: string;
}

interface TransactionsResponse {
  data: Transaction[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

// ─── Helper: generate page numbers to display ────────────────────────────────
const getPageNumbers = (currentPage: number, totalPages: number, maxVisible = 5) => {
  const pages: (number | "...")[] = [];
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(2, currentPage - 2);
    const right = Math.min(totalPages - 1, currentPage + 2);
    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
};

// ─── Skeleton Component ───────────────────────────────────────────────────────

const DashboardSkeleton = () => (
  <div className="min-h-screen w-full mx-auto">
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Balance Card Skeleton */}
      <Skeleton className="h-64 w-full mb-8 rounded-xl" />

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>

      {/* Transactions Card Skeleton */}
      <Skeleton className="h-10 w-48 mb-4" />
      <Card className="bg-white">
        <div className="p-6 border-b border-gray-200">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </Card>
    </main>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { payment, updatePayment } = usePayment();
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useAuth();

  // ── Pagination & Filter State ──────────────────────────────────────────────
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // ── API Hooks ─────────────────────────────────────────────────────────────
  const {
    data: walletData,
    isLoading: walletIsLoading,
    isError: walletIsError,
    error: walletError,
  } = useGetUserWalletBalance();

  const {
    data: transactionsData,
    mutateAsync: getTransactions,
    isPending: transactionsLoading,
  } = useGetTransactions();

  

  // ── Fetch transactions whenever page or dates change ─────────────────────
  useEffect(() => {
    if (walletData && !walletIsLoading) {
      getTransactions({ page, start_date: startDate, end_date: endDate }).then(
        (res: TransactionsResponse) => {
          console.log({lastPage:res});
          if (res.meta) {
            setTotalPages(res.meta.last_page);
            
          }
        }
      );
    }
  }, [walletData, walletIsLoading, page, startDate, endDate, getTransactions]);

  // ── Reset page to 1 when filters change ───────────────────────────────────
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setPage(1);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setPage(1);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const copyToClipBoard = (accountNumber: string) => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      })
      .catch((err) => console.log("Failed to copy text:", err));
  };

  const handlePaymentType = (
    type: "transfer" | "outbound" | "inbound" | "airtime" | "data"
  ) => {
    console.log(type);
  };

  const handleNavigate = (type: string) => {
    if (walletData && walletData?.pin !== 1) {
      setIsOpen(true);
      return;
    }
    // handlePaymentType(type as "transfer" | "outbound" | "inbound" | "airtime" | "data");
    handlePaymentType(type as "outbound" | "airtime" | "data");
    router.push(`/n/wallet/${type}`);
  };

  const handleClosePayment = () => {
    updatePayment({ type: null, step: 0 });
  };

  const handlePaymentSuccess = () => {};

  // ── Loading State ─────────────────────────────────────────────────────────
  if (walletIsLoading) {
    return <DashboardSkeleton />;
  }

  // ── No Wallet State ───────────────────────────────────────────────────────
  // if (walletIsError && walletError?.response?.data?.message === "Account not found") {
  if (walletIsError && walletError?.response?.data?.message === "Account not found") {
    return (
      <div className="min-h-screen w-full mx-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hello {user?.first_name} 👋
            </h2>
            <p className="text-gray-600">You don&apos;t have a wallet yet. Create one to get started.</p>

            <div className="flex items-center mt-12">
              <Button
                onClick={() => setCancel(true)}
                size="lg"
                className="mx-auto w-1/2 bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Create Wallet
              </Button>
            </div>
          </div>
        </main>

        <WalletCreationModal cancel={cancel} setCancel={setCancel} />
      </div>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────────────
  const transactions = transactionsData || [];

  return (
    <div className="min-h-screen w-full mx-auto">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hello {user?.first_name} 👋
          </h2>
          <p className="text-gray-600">Welcome back to your wallet</p>
        </div>

        {/* Balance Card */}
        <Card className="bg-blue-950 border-0 text-white mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 text-blue-100 bg-blue-800 px-2 py-1 rounded-tr-md rounded-bl-md">
            {walletData?.bankName}
          </div>
          <div className="px-8">
            <div className="flex items-center justify-between mb-12">
              <div className="mt-5">
                <p className="text-blue-100 text-sm mb-1">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-4xl font-bold">
                    {showBalance ? formatCurrency(walletData?.balance) : "••••••"}
                  </h3>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <p className="text-slate-500 text-sm mt-4">
                  <span className="font-semibold">+₦0.00</span> last 7 days
                </p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-blue-100 text-sm">Account Name</p>
                <p className="text-lg font-mono">{walletData?.accountName}</p>
              </div>
            </div>
            <div className="mt-12 space-y-4">
              <div className="md:hidden">
                <p className="text-blue-100 text-sm">Account Name</p>
                <p className="text-lg font-mono">{walletData?.accountName}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <p className="text-blue-100">Account Number:</p>
                <p className="font-mono flex items-center gap-2">
                  {walletData?.accountNumber}{" "}
                  {isCopied ? (
                    <IoCheckmark size={16} className="cursor-pointer text-gray-300" />
                  ) : (
                    <IoCopyOutline
                      onClick={() => copyToClipBoard(walletData?.accountNumber)}
                      size={16}
                      className="cursor-pointer text-gray-300"
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Button
            onClick={() => handleNavigate("outbound")}
            className="h-24 w-full bg-white border-2 cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
          >
            <Send size={46} className="text-blue-600" />
            <span className="font-semibold">Transfer</span>
          </Button>
          <Button
            onClick={() => handleNavigate("airtime")}
            className="h-24 w-full bg-white border-2 cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
          >
            <Smartphone size={46} className="text-purple-600" />
            <span className="font-semibold">Airtime</span>
          </Button>
          <Button
            onClick={() => handleNavigate("data")}
            className="h-24 w-full bg-white border-2 cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
          >
            <Wifi size={46} className="text-cyan-600" />
            <span className="font-semibold">Data</span>
          </Button>
          <Button
            onClick={() => handleNavigate("electricity")}
            className="h-24 w-full bg-white border-2 cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
          >
            <IoBulbOutline size={46} className="text-orange-600" />
            <span className="font-semibold">Electricity</span>
          </Button>
          <Button
            onClick={() => handleNavigate("tv")}
            className="h-24 w-full bg-white border-2 cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
          >
            <Tv size={46} className="text-green-600" />
            <span className="font-semibold">TV</span>
          </Button>
          {/* <Button
            className="h-24 w-full bg-white border-2 cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
          >
            <MdDashboard size={40} className="text-gray-600" />
            <span className="font-semibold">More</span>
          </Button> */}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 rounded-lg text-center p-4">
            <p className="text-sm text-gray-400 mb-1">Total Referrals</p>
            <p className="text-lg font-semibold">206</p>
          </div>
          <div className="bg-gray-100 rounded-lg text-center p-4">
            <p className="text-sm text-gray-400 mb-1">Referral Rewards</p>
            <p className="text-lg font-semibold">₦10,500</p>
          </div>
          <div className="bg-gray-100 rounded-lg text-center p-4">
            <p className="text-sm text-gray-400 mb-1">Escrow Account</p>
            <p className="text-lg font-semibold">0104493474738</p>
          </div>
          <div className="bg-gray-100 rounded-lg text-center p-4">
            <p className="text-sm text-gray-400 mb-1">Pending Balance</p>
            <p className="text-lg font-semibold">
              {formatCurrency(walletData?.escrowBalance)}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg text-center p-4">
            <p className="text-sm text-gray-400 mb-1">Last Deposit</p>
            <p className="text-lg font-semibold">01/26/2022</p>
          </div>
          <div className="bg-gray-100 rounded-lg text-center p-4">
            <p className="text-sm text-gray-400 mb-1">Weekly Reward Balance</p>
            <p className="text-lg font-semibold">₦2,323,343</p>
          </div>
        </div>

        {/* Transactions Section with Filters and Pagination */}
        <Card className="bg-white">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>

            {/* Date Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="h-10"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {transactionsLoading ? (
              // Skeleton for transactions while loading
              [...Array(4)].map((_, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((tx: Transaction) => {
                const isCredit = tx.side === "credit";
                const amount = isCredit
                  ? `+₦${Number(tx.amount).toLocaleString()}`
                  : `-₦${Number(tx.amount).toLocaleString()}`;
                const date = new Date(tx.createdAt).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const type = isCredit ? "received" : tx.purpose === "airtime" ? "airtime" : "sent";

                return (
                  <div
                    key={tx.unique_id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCredit
                            ? "bg-green-100"
                            : type === "airtime"
                            ? "bg-blue-100"
                            : "bg-red-100"
                        }`}
                      >
                        {isCredit ? (
                          <ArrowDownLeft size={20} className="text-green-600" />
                        ) : type === "airtime" ? (
                          <Smartphone size={20} className="text-blue-600" />
                        ) : (
                          <ArrowUpRight size={20} className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {tx.description || tx.purpose || "Transaction"}
                        </p>
                        <p className="text-sm text-gray-500">{date}</p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        isCredit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {amount}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-500">No transactions found.</div>
            )}
          </div>

          {/* Pagination Controls with Page Numbers */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || transactionsLoading}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              <div className="flex items-center gap-1 flex-wrap">
                {getPageNumbers(page, totalPages).map((p, idx) =>
                  p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={p}
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      disabled={transactionsLoading}
                      className="min-w-[36px]"
                    >
                      {p}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || transactionsLoading}
                className="flex items-center gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </main>

      {/* Payment Flow Modal */}
      {payment.type && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <PaymentFlow
              onClose={handleClosePayment}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      )}

      <PinCreationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}