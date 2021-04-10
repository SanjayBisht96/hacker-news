/*
  Warnings:

  - You are about to drop the column `mainText` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `hyperLink` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `mainText`,
    DROP COLUMN `hyperLink`,
    ADD COLUMN     `jobTitle` VARCHAR(191),
    ADD COLUMN     `jobDescription` VARCHAR(191),
    ADD COLUMN     `jobURL` VARCHAR(191);
