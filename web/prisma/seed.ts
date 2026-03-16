import { PrismaClient, ApplicationStatus } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { MOCK_CLIENTS } from "../app/lib/mock-clients";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
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

