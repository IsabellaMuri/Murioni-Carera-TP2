/*
  Warnings:

  - You are about to drop the column `adress` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `deliver_adress` on the `Order` table. All the data in the column will be lost.
  - Added the required column `address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliver_address` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "client_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL
);
INSERT INTO "new_Client" ("client_id", "email", "name", "password", "phone") SELECT "client_id", "email", "name", "password", "phone" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE TABLE "new_Order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_client" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "plates" TEXT NOT NULL,
    "deliver_address" TEXT NOT NULL,
    "discount" REAL,
    "total" REAL
);
INSERT INTO "new_Order" ("discount", "order_client", "order_id", "plates", "status", "total") SELECT "discount", "order_client", "order_id", "plates", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
