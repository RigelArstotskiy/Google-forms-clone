import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Шапка */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-700 hover:text-violet-600 transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="4" fill="#7C3AED" />
            <rect x="7" y="8" width="14" height="2" rx="1" fill="white" />
            <rect x="7" y="13" width="14" height="2" rx="1" fill="white" />
            <rect x="7" y="18" width="9" height="2" rx="1" fill="white" />
          </svg>
          <span className="text-lg font-medium">Forms</span>
        </Link>
      </header>

      {/* Контент */}
      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
