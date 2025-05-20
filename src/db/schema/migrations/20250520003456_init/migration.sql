-- CreateTable
CREATE TABLE "Admin" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "client_number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "adress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Menu" (
    "plate_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_client" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "plates" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "discount_percentage" REAL NOT NULL,
    "deliver_adress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Table" (
    "table_number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
