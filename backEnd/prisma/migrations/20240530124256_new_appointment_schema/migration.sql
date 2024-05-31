/*
  Warnings:

  - You are about to drop the column `content` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `doctor` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `content`,
    DROP COLUMN `time`,
    DROP COLUMN `title`,
    ADD COLUMN `doctor` VARCHAR(191) NOT NULL,
    ADD COLUMN `reason` VARCHAR(191) NULL;
