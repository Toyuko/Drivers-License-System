import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { MOCK_CLIENTS } from "@/app/lib/mock-clients";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }
  try {
    for (const client of MOCK_CLIENTS) {
      await prisma.client.upsert({
        where: { application_id: client.application_id },
        update: {
          full_name: client.full_name,
          passport_number: client.passport_number,
          current_status: client.current_status,
          notes: client.notes,
        },
        create: {
          full_name: client.full_name,
          passport_number: client.passport_number,
          application_id: client.application_id,
          current_status: client.current_status,
          notes: client.notes,
        },
      });
    }
    return NextResponse.json({ ok: true, message: "Database seeded." });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Seed failed" },
      { status: 500 }
    );
  }
}
