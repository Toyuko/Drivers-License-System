"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import { ApplicationStatus } from "../generated/prisma";

function requireAdmin() {
  // Login temporarily bypassed; no-op for now.
  return;
}

export async function updateClientStatus(formData: FormData) {
  requireAdmin();

  const clientId = String(formData.get("clientId") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  const notes = formData.get("notes");

  if (!clientId || !status) return;

  await prisma.client.update({
    where: { id: clientId },
    data: {
      current_status: status,
      notes: typeof notes === "string" ? notes : undefined,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/track");
}

export async function createClient(formData: FormData) {
  requireAdmin();

  const full_name = String(formData.get("full_name") ?? "").trim();
  const passport_number = String(formData.get("passport_number") ?? "").trim();
  const application_id = String(formData.get("application_id") ?? "").trim();
  const status = String(
    formData.get("status") ?? "APPLICATION_RECEIVED"
  ) as ApplicationStatus;
  const notes = formData.get("notes");

  if (!full_name || !passport_number || !application_id) {
    return;
  }

  await prisma.client.create({
    data: {
      full_name,
      passport_number,
      application_id,
      current_status: status,
      notes: typeof notes === "string" && notes.trim().length > 0 ? notes : null,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/track");
}


