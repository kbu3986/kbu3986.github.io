import Link from "next/link";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
        <Zap className="h-6 w-6 fill-current" />
      </span>
      <h1 className="mt-4 text-3xl font-black text-slate-900">404 — Page Not Found</h1>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        The battery guide or airline rule page you requested could not be found. Jump back to the WattCheck calculator below.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/en"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
        >
          WattCheck (English)
        </Link>
        <Link
          href="/ko"
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100"
        >
          와트체크 (한국어)
        </Link>
      </div>
    </div>
  );
}
