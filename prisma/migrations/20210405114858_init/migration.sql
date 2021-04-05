/*
  Warnings:

  - Added the required column `postedOn` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN     `postedOn` DATETIME(3) NOT NULL;
