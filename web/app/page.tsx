import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-[#0052a3] via-[#0064d2] to-[#003b80] p-[1px] shadow-lg">
        <div className="rounded-[22px] bg-white/95 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0052a3]">
            License Track &amp; Trace
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[#001b3f] sm:text-3xl">
            ระบบติดตามใบขับขี่คนต่างด้าว
          </h1>
          <p className="mt-1 text-sm text-slate-800">
            Thai Driver&apos;s License Application Tracking
          </p>
          <p className="mt-3 text-xs text-slate-600">
            ตรวจสอบสถานะคำขอใบขับขี่ผ่านระบบออนไลน์อย่างเป็นทางการ
            ด้วยเลขหนังสือเดินทาง หรือหมายเลขคำขอ
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/track"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#0052a3] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#00408a]"
            >
              ติดตามสถานะใบขับขี่ / Track Status
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center rounded-xl border border-[#d0ddff] bg-white px-4 py-2.5 text-xs font-medium text-[#0052a3] shadow-sm transition hover:border-[#b6c8ff] hover:bg-[#f5f7ff]"
            >
              สำหรับเจ้าหน้าที่ / Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
