import { PrismaClient, ApplicationStatus } from "../app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { MOCK_CLIENTS } from "../app/lib/mock-clients";

const url = process.env.DATABASE_URL ?? "";
const adapterUrl = url.startsWith("mysql://") ? url.replace(/^mysql:\/\//, "mariadb://") : url;
const adapter = new PrismaMariaDb(adapterUrl);
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const client of MOCK_CLIENTS) {
    await prisma.client.upsert({
      where: { application_id: client.application_id },
      update: {
        full_name: client.full_name,
        passport_number: client.passport_number,
        current_status: client.current_status as ApplicationStatus,
        notes: client.notes,
      },
      create: {
        full_name: client.full_name,
        passport_number: client.passport_number,
        application_id: client.application_id,
        current_status: client.current_status as ApplicationStatus,
        notes: client.notes,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

