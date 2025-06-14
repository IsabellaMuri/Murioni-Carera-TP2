/*
  Warnings:

  - You are about to drop the `Pedidos` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `client_number` on the `Client` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pedidos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_client" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "plates" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "discount_percentage" REAL NOT NULL,
    "deliver_adress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Booking" (
    "booking_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datetime" DATETIME,
    "table_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    CONSTRAINT "Booking_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "Table" ("table_number") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("client_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "client_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "adress" TEXT NOT NULL
);
INSERT INTO "new_Client" ("adress", "email", "name", "password", "phone") SELECT "adress", "email", "name", "password", "phone" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
