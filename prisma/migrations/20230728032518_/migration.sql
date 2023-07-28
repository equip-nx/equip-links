/*
  Warnings:

  - You are about to drop the column `clicks` on the `links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "links" RENAME COLUMN "clicks" TO "visits";