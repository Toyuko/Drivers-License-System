-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "current_status" TEXT NOT NULL DEFAULT 'APPLICATION_RECEIVED',
    "notes" TEXT,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_application_id_key" ON "Client"("application_id");

-- CreateIndex
CREATE INDEX "Client_passport_number_idx" ON "Client"("passport_number");

-- CreateIndex
CREATE INDEX "Client_application_id_idx" ON "Client"("application_id");
