import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const url = process.env.DATABASE_URL;
// Use a parseable placeholder when DATABASE_URL is missing (e.g. during build); runtime will require a real URL
const effectiveUrl =
  url && (url.startsWith("mysql://") || url.startsWith("mariadb://"))
    ? url.startsWith("mysql://")
      ? url.replace(/^mysql:\/\//, "mariadb://")
      : url
    : "mariadb://localhost:3306/placeholder";
const adapter = new PrismaMariaDb(effectiveUrl);

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

