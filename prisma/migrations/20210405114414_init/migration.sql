-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `mainText` VARCHAR(191),
    `hyperLink` VARCHAR(191),
    `isActive` BOOLEAN NOT NULL,
UNIQUE INDEX `Job.id_unique`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
