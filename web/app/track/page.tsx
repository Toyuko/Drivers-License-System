import { Search } from "lucide-react";
import { prisma } from "../lib/prisma";
import { STATUS_STEPS } from "../lib/mock-clients";

const pageTitle = "Track Driver's License Status";

async function getClient(search: string | null) {
  if (!search) return null;

  const trimmed = search.trim();
  if (!trimmed) return null;

  return prisma.client.findFirst({
    where: {
      OR: [
        { passport_number: trimmed },
        { application_id: trimmed },
      ],
    },
  });
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params.q;
  const query =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] ?? null : null;
  const client = await getClient(query);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl flex-col gap-8 px-4 py-10">
      <section className="mx-auto w-full max-w-2xl rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-sky-100">
        <h1 className="text-xl font-semibold text-sky-900">
          ติดตามสถานะใบขับขี่ /{" "}
          <span className="font-normal">Thai Driver&apos;s License Status</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          กรอกเลขหนังสือเดินทาง หรือ หมายเลขคำขอ เพื่อดูสถานะปัจจุบันของใบขับขี่ของท่าน
          <br />
          Enter your <span className="font-medium">Passport Number</span> or{" "}
          <span className="font-medium">Application ID</span> to view status.
        </p>

        <form
          method="get"
          action="/track"
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="search">
            Passport Number or Application ID
          </label>
          <div className="relative flex-1">
            <input
              id="search"
              name="q"
              defaultValue={query ?? ""}
              placeholder="เช่น PA1234567 หรือ TH-DL-2026-0001"
              className="w-full rounded-xl border border-sky-100 bg-sky-50/60 px-10 py-2.5 text-sm shadow-inner outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
            />
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-sky-500" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
          >
            ตรวจสอบ / Search
          </button>
        </form>
      </section>

      {query && !client && (
        <section className="mx-auto w-full max-w-2xl rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-4 text-sm text-amber-900">
          ไม่พบข้อมูลตามเลขที่ระบุ กรุณาตรวจสอบอีกครั้ง
          <br />
          No record found for the provided number. Please verify and try again.
        </section>
      )}

      {client && (
        <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl bg-white/95 p-6 shadow-sm ring-1 ring-sky-100">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-semibold text-sky-900">
                {client.full_name}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Passport: {client.passport_number} · Application ID:{" "}
                {client.application_id}
              </p>
            </div>
            <div className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700">
              อัปเดตล่าสุด / Last updated:{" "}
              {client.updated_at.toLocaleDateString("th-TH")}
            </div>
          </div>

          <div className="hidden gap-3 md:flex">
            {STATUS_STEPS.map((step, index) => {
              const currentIndex = STATUS_STEPS.findIndex(
                (s) => s.key === client.current_status
              );
              const isCompleted = index <= currentIndex;

              return (
                <div key={step.key} className="flex flex-1 flex-col items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                        isCompleted
                          ? "border-sky-600 bg-sky-600 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-400",
                      ].join(" ")}
                    >
                      {index + 1}
                    </div>
                    {index < STATUS_STEPS.length - 1 && (
                      <div
                        className={[
                          "h-0.5 flex-1 rounded-full",
                          isCompleted
                            ? "bg-sky-500"
                            : "bg-slate-200",
                        ].join(" ")}
                      />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-xs font-medium text-sky-900">
                      {step.th}
                    </div>
                    <div className="text-[11px] text-slate-500">{step.en}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {STATUS_STEPS.map((step, index) => {
              const currentIndex = STATUS_STEPS.findIndex(
                (s) => s.key === client.current_status
              );
              const isCompleted = index <= currentIndex;

              return (
                <div key={step.key} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold",
                        isCompleted
                          ? "border-sky-600 bg-sky-600 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-400",
                      ].join(" ")}
                    >
                      {index + 1}
                    </div>
                    {index < STATUS_STEPS.length - 1 && (
                      <div
                        className={[
                          "mt-1 w-px flex-1",
                          isCompleted
                            ? "bg-sky-400"
                            : "bg-slate-200",
                        ].join(" ")}
                      />
                    )}
                  </div>
                  <div className="mt-0.5 flex-1">
                    <div className="text-xs font-medium text-sky-900">
                      {step.th}
                    </div>
                    <div className="text-[11px] text-slate-500">{step.en}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {client.notes && (
            <div className="mt-2 rounded-xl bg-sky-50 px-3 py-2 text-xs text-sky-900">
              <div className="font-semibold">
                หมายเหตุ / Remark:
              </div>
              <div className="mt-1">{client.notes}</div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export const metadata = {
  title: pageTitle,
};

