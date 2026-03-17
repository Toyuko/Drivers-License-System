import { notFound } from "next/navigation";
import { prisma } from "../lib/prisma";
import { STATUS_STEPS } from "../lib/mock-clients";
import { Edit } from "lucide-react";
import { createClient, updateClientStatus } from "./actions";
import { DeleteClientButton } from "./DeleteClientButton";

export const dynamic = "force-dynamic";

async function requireAdminSession() {
  // Login temporarily bypassed; no-op for now.
  return;
}

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const clients = await prisma.client.findMany({
    orderBy: { updated_at: "desc" },
  });

  if (!clients) {
    notFound();
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-120px)] max-w-5xl px-4 py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-sky-900">
            แดชบอร์ดเจ้าหน้าที่ / Admin Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            จัดการคำขอใบขับขี่ ตรวจสอบ และปรับปรุงสถานะของผู้ยื่นคำขอ
            <br />
            Manage driver&apos;s license applications and update client status.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sky-100">
          <div className="max-h-[480px] overflow-auto text-xs">
            <table className="min-w-full border-separate border-spacing-0">
              <thead className="bg-sky-50/80 text-[11px] uppercase tracking-wide text-sky-800">
                <tr>
                  <th className="sticky top-0 z-10 border-b border-sky-100 px-3 py-2 text-left">
                    Applicant
                  </th>
                  <th className="sticky top-0 z-10 border-b border-sky-100 px-3 py-2 text-left">
                    Passport / Application ID
                  </th>
                  <th className="sticky top-0 z-10 border-b border-sky-100 px-3 py-2 text-left">
                    Status
                  </th>
                  <th className="sticky top-0 z-10 border-b border-sky-100 px-3 py-2 text-left">
                    Updated
                  </th>
                  <th className="sticky top-0 z-10 border-b border-sky-100 px-3 py-2 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, idx) => {
                  const statusMeta = STATUS_STEPS.find(
                    (s) => s.key === client.current_status
                  );
                  return (
                    <tr
                      key={client.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-sky-50/40"}
                    >
                      <td className="border-b border-slate-100 px-3 py-2 align-top">
                        <div className="font-medium text-sky-900">
                          {client.full_name}
                        </div>
                        {client.notes && (
                          <div className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">
                            {client.notes}
                          </div>
                        )}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top">
                        <div className="text-[11px] text-slate-700">
                          Passport: {client.passport_number}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          App ID: {client.application_id}
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top">
                        <span className="inline-flex rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-800">
                          {statusMeta?.th ?? client.current_status}
                        </span>
                        <div className="mt-0.5 text-[11px] text-slate-500">
                          {statusMeta?.en}
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top text-[11px] text-slate-500">
                        {client.updated_at.toLocaleDateString("th-TH")}{" "}
                        {client.updated_at.toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top text-right">
                        <div className="flex flex-wrap items-center justify-end gap-1">
                          <DeleteClientButton
                            clientId={client.id}
                            clientName={client.full_name}
                          />
                          <details className="inline-block">
                            <summary className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-sky-200 bg-white px-2 py-1 text-[11px] font-medium text-sky-800 shadow-sm hover:bg-sky-50">
                              <Edit className="h-3 w-3" />
                              Edit
                            </summary>
                          <div className="mt-2 w-64 rounded-xl border border-sky-100 bg-white p-3 shadow-lg">
                            <form action={updateClientStatus} className="space-y-2">
                              <input
                                type="hidden"
                                name="clientId"
                                value={client.id}
                              />
                              <label className="block text-[11px] font-medium text-slate-700">
                                สถานะ / Status
                              </label>
                              <select
                                name="status"
                                defaultValue={client.current_status}
                                className="w-full rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-[11px] outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
                              >
                                {STATUS_STEPS.map((step) => (
                                  <option key={step.key} value={step.key}>
                                    {step.th} / {step.en}
                                  </option>
                                ))}
                              </select>

                              <label className="mt-2 block text-[11px] font-medium text-slate-700">
                                หมายเหตุ / Notes
                              </label>
                              <textarea
                                name="notes"
                                defaultValue={client.notes ?? ""}
                                rows={3}
                                className="mt-1 w-full resize-none rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-[11px] outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
                              />

                              <button
                                type="submit"
                                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-sky-700 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-sky-800"
                              >
                                บันทึก / Save
                              </button>
                            </form>
                          </div>
                        </details>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-sky-100">
          <h2 className="text-sm font-semibold text-sky-900">
            เพิ่มผู้ยื่นคำขอใหม่ / New Application
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            บันทึกคำขอใบขับขี่ใหม่เข้าสู่ระบบ / Register a new driver&apos;s
            license application.
          </p>
          <form action={createClient} className="mt-4 space-y-3 text-[11px]">
            <div>
              <label className="block font-medium text-slate-700">
                ชื่อ-นามสกุล / Full name
              </label>
              <input
                name="full_name"
                required
                className="mt-1 w-full rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-xs outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700">
                เลขที่หนังสือเดินทาง / Passport number
              </label>
              <input
                name="passport_number"
                required
                className="mt-1 w-full rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-xs outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700">
                หมายเลขคำขอ / Application ID
              </label>
              <input
                name="application_id"
                required
                className="mt-1 w-full rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-xs outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700">
                สถานะเริ่มต้น / Initial status
              </label>
              <select
                name="status"
                defaultValue="APPLICATION_RECEIVED"
                className="mt-1 w-full rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-xs outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
              >
                {STATUS_STEPS.map((step) => (
                  <option key={step.key} value={step.key}>
                    {step.th} / {step.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700">
                หมายเหตุ / Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                className="mt-1 w-full resize-none rounded-lg border border-sky-100 bg-sky-50/60 px-2 py-1.5 text-xs outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-sky-700 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-sky-800"
            >
              บันทึกผู้ยื่นคำขอ / Save applicant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

