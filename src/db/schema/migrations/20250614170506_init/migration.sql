/*
  Warnings:

  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `discount_percentage` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_client" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "plates" TEXT NOT NULL,
    "deliver_adress" TEXT NOT NULL
);
INSERT INTO "new_Order" ("deliver_adress", "order_client", "order_id", "plates", "status") SELECT "deliver_adress", "order_client", "order_id", "plates", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
