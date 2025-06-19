/*
  Warnings:

  - Added the required column `plate_id` to the `OrderPlate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderPlate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "plate_id" INTEGER NOT NULL,
    CONSTRAINT "OrderPlate_plate_id_fkey" FOREIGN KEY ("plate_id") REFERENCES "Plate" ("plate_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderPlate_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("order_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderPlate" ("id", "order_id") SELECT "id", "order_id" FROM "OrderPlate";
DROP TABLE "OrderPlate";
ALTER TABLE "new_OrderPlate" RENAME TO "OrderPlate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
