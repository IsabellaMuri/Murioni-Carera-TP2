-- CreateTable
CREATE TABLE "OrderPlate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "OrderPlate_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("order_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
