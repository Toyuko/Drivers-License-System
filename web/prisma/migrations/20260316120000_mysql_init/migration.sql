-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `passport_number` VARCHAR(191) NOT NULL,
    `application_id` VARCHAR(191) NOT NULL,
    `current_status` ENUM('APPLICATION_RECEIVED', 'DOCUMENT_VERIFICATION', 'PROCESSING_DLT', 'LICENSE_ISSUED', 'DISPATCHED_COMPLETED') NOT NULL DEFAULT 'APPLICATION_RECEIVED',
    `notes` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Client_application_id_key`(`application_id`),
    INDEX `Client_passport_number_idx`(`passport_number`),
    INDEX `Client_application_id_idx`(`application_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
