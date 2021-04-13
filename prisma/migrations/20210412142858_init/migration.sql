/*
  Warnings:

  - You are about to drop the column `adminName` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `adminName`,
    ADD COLUMN     `email` VARCHAR(191);
