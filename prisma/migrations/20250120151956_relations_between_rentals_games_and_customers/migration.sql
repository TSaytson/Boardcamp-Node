-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "birthday" DATE NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "stockTotal" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "pricePerDay" INTEGER NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "rentDate" DATE NOT NULL,
    "daysRented" INTEGER NOT NULL,
    "returnDate" DATE,
    "originalPrice" INTEGER NOT NULL,
    "delayFee" INTEGER,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_categoryId_key" ON "games"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "rentals_customerId_key" ON "rentals"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "rentals_gameId_key" ON "rentals"("gameId");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
