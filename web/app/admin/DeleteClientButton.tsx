"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { deleteClient } from "./actions";

type Props = { clientId: string; clientName: string };

export function DeleteClientButton({ clientId, clientName }: Props) {
  const confirmedRef = useRef(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirmedRef.current) {
      e.preventDefault();
      const ok = window.confirm(
        `ลบผู้ยื่นคำขอ "${clientName}" ออกจากระบบใช่หรือไม่?\n\nDelete applicant "${clientName}"? This cannot be undone.`
      );
      if (ok) {
        confirmedRef.current = true;
        e.currentTarget.requestSubmit();
      }
    }
  }

  return (
    <form action={deleteClient} onSubmit={handleSubmit} className="inline-block">
      <input type="hidden" name="clientId" value={clientId} />
      <button
        type="submit"
        className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-2 py-1 text-[11px] font-medium text-red-700 shadow-sm hover:bg-red-50"
        title="Delete client"
      >
        <Trash2 className="h-3 w-3" />
        Delete
      </button>
    </form>
  );
}
